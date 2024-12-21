//todo - new , update, delete, done, deletefull -> Authorized
const { Router } = require('express');
const todoRouter = Router();
const { authMiddleware } = require('../middleware/authMiddleware')
const { todoModel } = require('../db')

// todoRouter.use(authMiddleware)

todoRouter.get('/',async function (req,res) {
    //Fetch userId from token
    //Fetch corresponding todoId from the todoIdArray
    //Send it to client and save in the local variable on client side
    //if no token->jump to HomePage
    res.json({
        message:"Welcome my friends welcome"
    })
})

todoRouter.post('/new', async function(req,res) {
    //Fetch title from body
    //fetch userId from token
    //Push to database
    //reponse the todo Id
})

todoRouter.put('/update',async function(req,res) {
    //fetch title from body and todo Id from body
    //search for todoId and update the corresponding document 
})

todoRouter.post('/done', async function(req ,res) {
    //fetch todoId from body
    //search in db, mark as done
})

todoRouter.post('/delete', async function(req, res) {
    //fetch todoId from body
    //search in db, remove entry from the array field of User document,remove the document
})

todoRouter.get('/deleteAll', async function(req, res) {
    //fetch userId from token
    //make the todosArray empty
})


module.exports = {
    todoRouter
}