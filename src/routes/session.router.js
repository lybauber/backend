import {Router} from 'express';
import userModel from '../dao/models/user.model.js';

const router = Router();

router.get("/register/new", (req, res) => {
    res.render("/register");
});

// router.post('/register', async (req, res) => {
//     const {first_name, last_name, email, age, password} = req.body;

//     const userValidator = await userModel.findOne({email});
//     if (userValidator) {
//         return res.status(400)
//         .send({
//             status: 'error', 
//             error: 'User already exists'});
//     }
//     const user = await userModel.create({first_name, last_name, email, age, password});
//     res.send({
//         status: 'success', 
//         payload: user
//     });
// })

router.get("/login", (req, res) => {
    res.render("/login");
})


router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await userModel.findOne({email, password});
    if (!user) {
        return res.status(400)
        .send({
            status: 'error', 
            error: 'Invalid credentials'});
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

router.get("/profile", (req, res) => {
    res.render("/profile", {user: req.session.user});
})


export {router as sessionsRouter};