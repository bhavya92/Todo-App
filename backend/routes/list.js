const { topicModel } = require('../db');
const { todoListModel } = require('../db');
const { authMiddleware } = require('../middleware/authMiddleware');
const { Router } = require('express');
const listRouter = Router();
listRouter.use(authMiddleware);

//Getting all lists
listRouter.get('/:topicId/all', async function (req,res) {
    console.log('/:topicId/all hitted');
    const { topicId } = req.params;
    let listsFound;
    try {
        listsFound = await todoListModel.find({
            'topic.id':topicId
        })

        console.log(listsFound);
        return res.status(200).json({
            todoLists:listsFound
        })
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            'error':'Failed to get the lists'
        })
    }
})

//creating new list

listRouter.post('/:topicId/new', async function(req,res) {
    console.log('/:topicId/new hitted');
    const { topicId } = req.params;
    const listTitle = req.body.title;
    let topicFound;
    
    try {
        topicFound = await topicModel.findById(topicId)
    } catch(err) {
        console.log(err);
        return res.json(500).json({
            'error':'Server Error'
        })
    }

    if(topicFound === null) {
        console.log('Topic not found')
        return res.status(404).json({
            'error':'topic not found'
        })
    }

    try {
        await todoListModel.create({
            title:listTitle,
            topic:{
                id:topicId,
                title:topicFound.title
            }
        })
        return res.status(200).json({
            'message':'list created'
        })
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            'error':'Failed to create new list'
        })
    }
})

//deleting a list
listRouter.delete('/delete/:id', async function(req, res) {
    const { id } = req.params;
    try {
        await todoListModel.findByIdAndDelete(id);
        return res.json(200).json({
            'message':'List Deleted'
        })
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            'error':'Server Error'
        })
    }
})

//updating list name
listRouter.put('/update/:id', async function(req,res) {
    const { id } = req.params;
    const newTitle = req.body.title;
    try {
        await todoListModel.findByIdAndUpdate(
            {
                _id:id
            },
            {
               title:newTitle 
            }
        )
        return res.status(200).json({
            'message':'list title updated'
        })
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            'error':'Server Error'
        })
    }
})

module.exports = {
    listRouter
}