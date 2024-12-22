//todo - new , update, delete, done, deletefull -> Authorized
const { Router } = require('express');
const todoRouter = Router();
const { authMiddleware } = require('../middleware/authMiddleware')
const { todoModel } = require('../db')
const { userModel } = require('../db');
const e = require('express');

todoRouter.use(authMiddleware)

todoRouter.get('/',async function (req,res) {

    const userId = req.userId;
    let userFound;
    let todoTitleArray = [];
    try{
        userFound = await userModel.findOne({
            _id:userId
        })
        let todoArray = userFound.todos;
        for(let i=0;i<todoArray.length;i++) {
            let todoFound = await todoModel.findOne({
                _id : todoArray[i]
            })
            todoTitleArray.push(todoFound.title);
        }
        res.json({
            todos:todoTitleArray
        })

    } catch(err) {
        console.log("Error : " + err);
    }
})

todoRouter.post('/new', async function(req,res) {

    const title = req.body.title;
    const userId = req.userId;
    let newTodo;
    try {
        newTodo = await todoModel.create({
            title: title,
            done: false,
            userId: userId
        });
        res.json({
            message: "Todo added",
            todoId : newTodo._id .toString()
        })
    } catch (error) {
        console.error("Error adding todo: ", error);
    }
    try{
        await userModel.findOneAndUpdate(
            {
                _id : userId
            },
            {
                $push: { todos: newTodo._id } 
            }
        )
    } catch(err) {
        console.log("Error " + err);
    }
})

todoRouter.put('/update',async function(req,res) {

    const { title, todoId } = req.body;
    try{
        await todoModel.findByIdAndUpdate({
            _id: todoId
        },{
            title : title
        })
        res.json({
            message:"Todo Updated"
        })
    } catch(err) {
        console.log("Error " + err);
        res.json({
            message:"Error Occured"
        })
    }
})

todoRouter.post('/done', async function(req ,res) {

    const todoId = req.body.todoId;
    try{
        await todoModel.findOneAndUpdate({
            _id : todoId
        },{
            done:true
        })
        res.json({
            message:"Marked as done"
        })
    } catch(err) {
        console.log("Error "  +err);
    }
    

})

todoRouter.delete('/delete', async function(req, res) {

    const todoId = req.body.todoId;
    const userId = req.userId;
    try{
        await todoModel.deleteOne({
            _id : todoId
        })
    } catch(err) {
        console.log("Error + " + err);
    }

    try {
        await userModel.findOneAndUpdate({
            _id : userId
        },{
            $pull: { todos: todoId }
        })
        res.json({
            message : "Todo Deleted"
        })
    } catch(err) {
        console.log("Error : + " + err);
    }
})

todoRouter.delete('/deleteAll', async function(req, res) {

    const userId = req.userId;
    const { todos } = req.body;
    console.log(todos);
    for(let i = 0; i<todos.length;i++) {
        try{
            await todoModel.deleteOne({
                _id : todos[i]
            })
        } catch(err) {
            console.log(err);
        }
    }
    try {
        await userModel.findOneAndUpdate({
            _id : userId
        },{
            $set: { todos: [] }
        })
        res.json({
            message : "All Todos Deleted"
        })
    } catch(err) {
        console.log("Error : + " + err);
    }

})


module.exports = {
    todoRouter
}