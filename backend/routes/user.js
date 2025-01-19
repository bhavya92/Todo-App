require('dotenv').config()

const { Router } = require('express');
const { userModel } = require('../db')
const { z } = require('zod')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');
const { authMiddleware } = require('../middleware/authMiddleware');

async function generateHash(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, parseInt(process.env.SALTROUND), function(err, hash) {
                if(err) {
                        console.log(err);
                        reject(err);
                } else {
                    console.log("Hash generation successful");
                    resolve(hash);
                }
            });
    });
}

const signUpSchema = z.object({
    email : z.string().email().toLowerCase().trim(),
    password : z.string().min(8).trim(),
    firstName : z.string().min(2).max(20).trim(),
    lastName : z.string().min(2).max(20).trim() 
});

const logInSchema = z.object({
    email : z.string().email().toLowerCase().trim(),
    password : z.string().min(8).trim()
})

const userRouter = Router();


userRouter.post('/signup', async function(req,res) {
    console.log("signup end point hitted");

    const userData = req.body;
    let generatedHash = "";
    let result = signUpSchema.safeParse(userData);
    console.log("req : " + req.body.email);

    if(!(result.success)) {
        return res.status(500).json({
            status:'500',
            error : "Internal Server Error",
            message : "Something went wrong. Please try again later."
        })
    }
   
    //Checking if user already exists 
    try {
        const user = await userModel.find({email : result.data.email});
        if(user.length !== 0) {
            return res.status(409).json({
                status:'409',
                error : "Conflict",
                message : "Email already exists"
            })
        } 
        generatedHash = await generateHash(result.data.password);

        const newUser = await userModel.create({
            email: result.data.email,
            password: generatedHash,
            firstName: result.data.firstName,
            lastName: result.data.lastName
        });
        //generate token and send 
        const token = jwt.sign({
            id: newUser._id,
            }, process.env.JWT_SECRET);
        console.log("Token generated " + typeof token);
        //TODO : Create personal topic of new user created     
        res.status(200).cookie('token',token, {
            httpOnly:true,
            secure : true,
            sameSite:'None',
            expires: new Date(Date.now() + 7 * 24 * 3600000) 
        }).json({
            status:'200',
            error:"none",
            message:"Signup Success",
        })

    } catch(err) {
        console.log(err);
        
    }
})
// userRouter.get('/signup/google',passport.authenticate('google'));
userRouter.get('/validate-token',authMiddleware, function(req,res){
    res.status(200).json({
        status:'200',
        error:"none",
        message:'Token Validated'
    })
}) 

userRouter.post('/login',async function(req,res) {
    console.log("login hitted");
    const userData = req.body;
    let result = logInSchema.safeParse(userData);

    if(!(result.success)) {
        return res.status(400).json({
            status:'400',
            message:'None',
            error:'Bad Request'
        })
    }

    const user = await userModel.findOne({
        email: result.data.email,
    });
    if (user) {
        bcrypt.compare(result.data.password, user.password, function(err, result) {
            if(result) {
                const token = jwt.sign({
                    id: user._id,
                }, process.env.JWT_SECRET);
                console.log("Token generated " + token);
                res.status(200).cookie('token',token, {
                    httpOnly:true,
                    secure : true,
                    sameSite:'None',
                    expires: new Date(Date.now() + 7 * 24 * 3600000) 
                }).json({
                    status:'200',
                    message:"Login Success",
                    error:'None',
                })
            } else {
                res.status(401).json({
                    status : '401',
                    error : "Unauthorized",
                    message: "Incorrect credentials"
                })                
            }
        });
    } else {
        res.status(403).json({
            status:'403',
            error:"Forbidden",
            message: "Incorrect credentials"
        })
    }        

})

userRouter.post("/logout", authMiddleware, function(req,res) {
    res.status(200).cookie('token','',{
        httpOnly:true,
        secure  :true,
        sameSite : 'None',
        expires : new Date(0)
    }).json({
        status:'200',
        error:"none",
        message:"User logeged out"
    })
})

module.exports = {
    userRouter
}