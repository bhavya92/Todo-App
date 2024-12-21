// Two routes - user - signup,login, ( settings - Authorized) 
// todo - new , update, delete, done, deletefull -> Authorized
require('dotenv').config()
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { userModel } = require('../db')

console.log("JWT_SECRET" + process.env.JWT_SECRET);

const userRouter = Router();

userRouter.post('/signup', async function(req,res) {
    //Takeout details from body
    //Do input Validation using Zod
    //password hashing and salting (bcrypt)
    //Push data to database
})

userRouter.post('/login',async function(req,res) {
    //Takeout detials from body
    //Do inputvalidation
    //Hashing and Salting
    //Fetch data from database , compare hash
    //if exists-> generateToken() and send to client
    //else Wrong Credentials
})

module.exports = {
    userRouter
}