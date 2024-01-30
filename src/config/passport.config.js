import passport from "passport";
import local from "passport-local";
import userModel from "../dao/models/user.model.js";
import cartsModel from "../dao/models/cart.models.js";
import { createHash, isValidPassword } from "../utils.js";
import GitHubStrategy from "passport-github2";

const LocalStrategy = local.Strategy;

const initializePassport = () => {

    passport.use('register', new LocalStrategy(
        {passReqToCallback: true, usernameField: 'email'},
        async (req, username, password, done) => {
            const {first_name, last_name, email, age} = req.body;
            try {
                let user = await userModel.findOne({email:username});
                if (user) {
                    console.log('User already exists');
                    return done(null, false);
                }

                const cart = await cartsModel.create({});


                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password),
                    cart: cart._id
                };
                const result = await userModel.create(newUser);
                return done(null, result);
            } catch (error) {
                return done(error);
            }
        
        }
    ));


    passport.use('login', new LocalStrategy(
        {usernameField:'email'},
        async (username, password, done) => {
            try {
                const user = await userModel.findOne({email:username});
                if (!user) {
                    console.log('User not found');
                    return done(null, false);
                }
                if (!isValidPassword(user, password)) {
                    console.log('Invalid password');
                    return done(null, false);
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        
        
        }
    ))
    passport.serializeUser((user,done)=>{
        done(null, user._id);
    
    });

    passport.deserializeUser(async(id,done)=>{
        let user = await userModel.findById(id);
        done(null, user);
    });

    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.2920868541b90e4d',
        clientSecret: '35ff3a2bdac2cf92193524b8955f8530b6f8ea2b',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
    }, async(accesToken, refreshToken, profile, done) =>{
        try{
            console.log(profile._json.name);

            let user = await userModel.findOne({email:profile._json.email});
            if(user){
                console.log('User already exists');
                return done(null, false);
            }
            const newUser = {
                first_name: profile._json.name,
                last_name: '',
                email: profile._json.email,
                age: 18,
                password : ''
            }
            let result = await userModel.create(newUser);
            return done(null, result);

        }catch(error){
            return done(error);

        }
    }))
}

export default initializePassport;