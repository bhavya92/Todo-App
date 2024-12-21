// Two routes - user - signup,login, ( settings - Authorized) 
// todo - new , update, delete, done, deletefull -> Authorized
require('dotenv').config()

const { Router } = require('express');
const { userModel } = require('../db')
const { z } = require('zod')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


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

    const userData = req.body;
    let result = signUpSchema.safeParse(userData);
    if(result.success) {
        try{
            const generatedHash = await generateHash(result.data.password);
            console.log('Zod success');
            console.log("PRINTING generatedHash");
            console.log(generatedHash);
            try {
                await userModel.create({
                    email: result.data.email,
                    password: generatedHash,
                    firstName: result.data.firstName,
                    lastName: result.data.lastName
                });
                console.log("User created successfully:");
                res.json({
                    message: "Signup succeeded"
                })
            } catch (error) {
                console.error("Error creating user:", error);
            }
        } catch (error){
            console.error("Error while generating hash:", error)
        }
    } else {
        console.log(result.error);
        console.log('Zod aint good bro');
        res.json({
            message:"Input Validation Failed"
        })
    }
})

userRouter.post('/login',async function(req,res) {
    const userData = req.body;
    let result = logInSchema.safeParse(userData);
    if(result.success) {
        console.log("In if(result.success)" );
        console.log(result.data.password)
        const user = await userModel.findOne({
            email: result.data.email,
        });

        if (user) {
            bcrypt.compare(result.data.password, user.password, function(err, result) {
                console.log(user.password);
                console.log(result);
                if(result) {
                    const token = jwt.sign({
                        id: user._id,
                    }, process.env.JWT_SECRET);
            
                    res.json({
                        token: token
                    })
                    console.log('User Found')
                    console.log('First : ' + user.firstName); 
                    
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
        console.log(result.error);
        console.log('Zod aint good bro');
        res.json({
            message:"Input Validation Failed"
        })
    }
})

module.exports = {
    userRouter
}