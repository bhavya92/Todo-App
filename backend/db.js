const mongoose =  require('mongoose');
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
});

const topicSchema =  new Schema({
    title:String,
    user:{
        id:ObjectId,
        name:String,
    }
});

const todoListSchema = new Schema({
    title:String,
    topic:{
        id:ObjectId,
        title:String
    }
})

const todoSchema = new Schema({
    title:String,
    dueDate:String,
    starred:Boolean,
    daily:Boolean,
    todoList:{
        id:ObjectId,
        title:String,
    },
    user:{
        id:ObjectId,
        name:String,
    }
});



const userModel = mongoose.model('User',userSchema);
const todoModel = mongoose.model('Todo',todoSchema);
const topicModel = mongoose.model('Topic',topicSchema);
const todoListModel = mongoose.model('TodoList',todoListSchema);

module.exports = {
    userModel,
    todoModel,
    topicModel,
    todoListModel
}

