//Middlewares - rate limiter, authMiddleware
const jwt = require('jsonwebtoken')
const cp  = require('cookie-parser')
function authMiddleware(req,res,next) {
    const token = req.cookies.token;
    console.log("Inside authMiddleware");
    console.log("Token : " + token);
    if(token){
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(decoded) {
            req.userId = decoded.id;
            next();
        } else {
            return res.status(403).json({
                message:"You are not signed in"
            })
        }
    } else {
        console.log("Nothing in cookie no token ");
        res.status(403).json({
            message:"You are not signed in"
        })
    }
    
 
}

module.exports = {
    authMiddleware
}