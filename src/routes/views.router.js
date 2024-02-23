import { Router } from "express";

const router = Router();

const publicAcces = (req, res, next) => {
    if(req.session.user){
        return res.redirect('/');
    }
    next();
}
const privateAcces = (req, res, next) => {
    if(!req.session.user){
        return res.redirect('/login');
    }
    next();
}

router.get("/register", publicAcces, (req, res) => {
    res.render("login/register");
});

router.get("/login", publicAcces,(req, res) => {
    res.render("login/login");
})

router.get("/profile", privateAcces, (req, res) => {
    res.render("login/profile", {user: req.session.user});
    // res.render('login/profile')
})

router.get('/resetPassword', (req, res) => {
    res.render('login/resetPassword');
})


export {router as viewsRouter};