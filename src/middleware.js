export const isLoggedIn = (req, res, next) => {

	if (!req.isAuthenticated()) {
		res.redirect('/login');
	}
    next();
	
}

export const checkRole = (roles)=>{
    return (req,res,next)=>{
        if(!req.user){
            return res.json({
                status: 'Error',
                message: 'User not autenticated'
            })
        }
        if(!roles.includes(req.user.rol)){
            return res.json({
                status: 'Error',
                message: 'User not authorized'
            })
        }
        next()
    }
}