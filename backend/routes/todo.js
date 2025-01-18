//todo - new , update, delete, done, deletefull -> Authorized
const { Router } = require('express');
const todoRouter = Router();
const { authMiddleware } = require('../middleware/authMiddleware')
const { todoModel, topicModel } = require('../db')
const { userModel } = require('../db');
const e = require('express');

todoRouter.use(authMiddleware)

//Getting all todos 
todoRouter.get('/:listId/all',async function (req,res) {
    const { listId } = req.params;
    let todosFound;
    try {
        todosFound = await todoModel.find({
            'todoList.id':listId
        })
        console.log(todosFound);
        return res.status(200).json({
            todos:todosFound
        })
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            'error':'Server Error'
        })
    }
    
})

todoRouter.post('/:listId/new', async function(req,res) {
    let userFound,listFound;
    const { listId } = req.params;
   
    try{
        userFound = await userModel.findById(req.userId);

        if(userFound === null) {
            return res.status(404).json({
                'error':'User not found'
            })
        }

        listFound = await topicModel.findById(listId);
        
        if(listFound === null) {
            return res.status(404).json({
                'error':'List not found'
            })
        }

        await todoModel.create({
            title:req.body.title,
            dueDate:req.body.dueDate,
            starred:req.body.starred,
            daily:req.body.daily,
            done:false,
            todoList:{
                id:listId,
                title:listFound.title
            },
            user:{
                id:req.userId,
                name:userFound.firstName
            }        
        })
        res.status(200).json({
            'message':'todo addded'
        })

    } catch(err) {
        console.log(err);
        return res.status(500).json({
            'error':'Server Error'
        })
    }

})

todoRouter.put('/update/:id',async function(req,res) {
    const { id } = req.params;
    try{
        await todoModel.findByIdAndUpdate({
            _id: id
        },{
            title:req.body.title,
            dueDate:req.body.dueDate,
            starred:req.body.starred,
            daily:req.body.daily,
            done:req.body.done
        })
        res.status(200).json({
            message:"Todo Updated"
        })
    } catch(err) {
        console.log("Error " + err);
        res.status(500).json({
            'error':"Server Error"
        })
    }
})

todoRouter.delete('/delete/:id', async function(req, res) {

    const { id } = req.params;
    try{
        await todoModel.findByIdAndDelete(id)
        return res.status(200).json({
            'message':'todo deleted'
        })
    } catch(err) {
        console.log("Error + " + err);
        return res.status(500).json({
            'error':'Server Error'
        })
    }
})


module.exports = {
    todoRouter
}