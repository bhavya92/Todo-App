require('dotenv').config()

const { Router } = require('express');
const { userModel } = require('../db')
const { z } = require('zod')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');

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
    let result = signUpSchema.safeParse(userData);
    console.log("req : " + req.body.email);
    if(result.success) {
        try{
            const generatedHash = await generateHash(result.data.password);
            try {
                await userModel.create({
                    email: result.data.email,
                    password: generatedHash,
                    firstName: result.data.firstName,
                    lastName: result.data.lastName
                });
                res.status(200).json({
                    message: "Signup succeeded"
                })
            } catch (error) {
                console.error("Error creating user:", error);
            }
        } catch (error){
            console.error("Error while generating hash:", error)
        }
    } else {
        res.status(400).json({
            message:"Input Validation Failed"
        })
    }
})
// userRouter.get('/signup/google',passport.authenticate('google'));

userRouter.post('/login',async function(req,res) {
    const userData = req.body;
    let result = logInSchema.safeParse(userData);
    if(result.success) {
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
                    res.status(200).json({
                        token: token
                    })
                } else {
                    res.status(403).json({
                        message: "Incorrect credentials"
                    })                
                }
            });
        } else {
            res.status(403).json({
                message: "Incorrect credentials"
            })
        }        
    } else {
        res.json({
            message:"Input Validation Failed"
        })
    }
})

module.exports = {
    userRouter
}