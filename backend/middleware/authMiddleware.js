//Middlewares - rate limiter, authMiddleware
const jwt = require('jsonwebtoken')

function authMiddleware(req,res,next) {
    const token = req.headers.authorization;
    console.log("Inside authMiddleware");
    console.log("Token : " + token);
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    
    if(decoded) {
        req.userId = decoded.id;
        next();
    } else {
        res.status(403).json({
            message:"You are not signed in"
        })
    }
}

module.exports = {
    authMiddleware
}