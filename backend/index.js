require('dotenv').config()
console.log(process.env.MONGO_URL);
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { userRouter } = require('./routes/user');
const { todoRouter } = require('./routes/todo');
const app = express();
app.use(express.json());
app.use(cors());
app.use('/user',userRouter);
app.use('/todo',todoRouter);

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        app.listen(parseInt(process.env.PORT));
        console.log('Listening on Port 3000');
    } catch(error) {
        console.log("Error connecting to DB " + error);
    }
    
}

main()