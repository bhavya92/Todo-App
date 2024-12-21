/*
userSchema -> _id, email, password, firstName, lastName
todoSchema -> _id,title,done(boolean),userId 
*/
const mongoose =  require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    email : {
        type:String,
        unique:true
    },
    password : String,
    firstName : String,
    lastName : String,
    todos : {
        type:[ObjectId],
        ref:'todo'
    }
});

const todoSchema = new Schema({
    title:String,
    done:Boolean,
    userId: {
        type: ObjectId,
        ref: 'User'
    }
});

const userModel = mongoose.model('User',userSchema);
const todoModel = mongoose.model('Todo',todoSchema);

module.exports = {
    userModel,
    todoModel
}
