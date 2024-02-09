import {Router} from 'express';
import userModel from '../dao/models/user.model.js';
import { createHash, isValidPassword} from '../utils.js';
import passport from 'passport';

const router = Router();

// router.post('/register', async (req, res) => {
//     const {first_name, last_name, email, age, password} = req.body;

//     const userValidator = await userModel.findOne({email});
//     if (userValidator) {
//         return res.status(400)
//         .send({
//             status: 'error', 
//             error: 'User already exists'});
//     }

//     const user = {
//         first_name,
//         last_name,
//         email,
//         age,
//         password: createHash(password)  //encriptar la contraseña
//     }

//     let newUser = await userModel.create(user);
    
//     res.send({
//         status: 'success', 
//         msg: 'User registered succes'
//     });
// })

router.post('/register', passport.authenticate('register', {passReqToCallback:true,session:false, failureRedirect:"/api/sessions/failregister", failureMessage:true}),
    async (req, res) => {
        res.send({
            status: 'success',
            msg: 'User registered success'
        })
    }
)

router.get('/failregister', (req, res) => {
    res.send({
        status: 'error',
        msg: 'User already exists'
    })
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await userModel.findOne({email});


    if (!user) {
        return res.status(400)
        .send({
            status: 'error', 
            error: 'User not registered'});
    }

    const isValid = isValidPassword(user, password);
    if (!isValid) {
        return res.status(400)
        .send({
            status: 'error', 
            error: 'Invalid password'});        
    
    }

    req.session.user = {
        full_name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
    }
    res.send({
        status: 'success', 
        payload: req.session.user,
        msg: 'My first Login'
    });

})

// router.post('/login', passport.authenticate('login', {failureRedirect:"/api/sessions/faillogin"}),
//     async (req, res) => {
//         if(!req.user){
//             return res.status(400).send({
//                 status: 'error', 
//                 error: 'User not found'
//             })
//         }
//         req.session.user = {
//             first_name: req.user.first_name,
//             last_name: req.user.last_name,
//             email: req.user.email,
//             age: req.user.age,
//         }
//         res.send({
//             status: 'success',
//             payload: req.session.user,
//         })
//     })

// router.get('/faillogin', (req, res) => {
    
//     res.send({
//         status: 'error',
//         msg: 'Invalid credentials'
//     })

// })

router.get('/github', passport.authenticate('github', {scope:['user:email']}),
async (req, res) => {})

router.get('/githubcallback', passport.authenticate('github', {failureRedirect:'/login'}),
async (req, res) => {
    req.session.user = req.user;
    res.redirect('/profile')
})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) {
            return res.status(500).send({
                status: 'error', 
                error: "You Can't Logout"
            })
        }
        res.redirect('/login')
    })
})

router.post('/restartPassword', async (req,res)=>{
    const {email, password} = req.body;
    if(!email || !password) return res.status(400).send(
    res.send({
            status: 'error', 
            error: 'errors data'
        })
    )
    const user = await userModel.findOne({email});
    if(!user) return res.status(400).send(
        res.send({
                status: 'error', 
                error: 'user not registred'
            })
    )
    const newPassword = createHash(password);

    await userModel.updateOne({_id:user._id}, {$set:{password: newPassword}});

    res.send({
        status: 'success',
        msg:'password Update'
    })
})


export {router as sessionsRouter};