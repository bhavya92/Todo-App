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
    topics : [ObjectId],
});

const topicSchema =  new Schema({
    title:String,
    userId:ObjectId,
    todoList :[ObjectId]
});

const todoListSchema = new Schema({
    topic:[ObjectId],
    todos:[ObjectId]
})

const todoSchema = new Schema({
    title:String,
    done:Boolean,
    userId:ObjectId
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

