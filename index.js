/*
    Two routes - user - signup,login, ( settings - Authorized) 
                 todo - new , update, delete, done, deletefull -> Authorized
                 Middlewares - rate limiter, authMiddleware
*/ 
require('dotenv').config()
console.log(process.env.MONGO_URL);
const express = require('express');
const mongoose = require('mongoose');

const { userRouter } = require('./routes/user');
const { todoRouter } = require('./routes/todo');
const app = express();
app.use(express.json());

app.use('/api/v1/user',userRouter);
app.use('/api/v1/todo',todoRouter);

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(3000);
    console.log('Listening on Port 3000');
}

main()