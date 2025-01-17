const { topicModel } = require('../db')
const { userModel } = require('../db')
const { authMiddleware } = require('../middleware/authMiddleware')
const { Router } = require('express');

const topicRouter = Router();
topicRouter.use(authMiddleware);
  
// GET /all - to fetch all topic name
// GET /id
// POSt /new - create new topic 
// DELETE /delete - delete topic 
// UPDATE /update - topic name

// GET - /list - fetch all lists of that topic
// POST /list/newList - added new List 
// DELETE /list/delete - DELETE a List
// POST /list/update - Update name

//Function to return all topic names 
topicRouter.get('/', async function(req, res) {
    console.log('/topic hitted');
    const userId = req.userId;
    let topicsFound;
    
    try {
        topicsFound = await topicModel.find({
           'user.id':userId
        })
        console.log(topicsFound)
        res.status(200).json({
            topics:topicsFound
        })
    } catch(err) {
        console.log("Error : " + err);
        res.status(404);
    }
})

//Function to create a new topic
topicRouter.post('/new',async function(req,res) {
    console.log('/topic/new hitted');
    console.log("userId " + req.userId);
    const userID = req.userId;
    const topicTitle = req.body.title;
    let userFound, newTopic;
    try{
        userFound = await userModel.findById(userID);
    } catch(err) {
        console.log("Error : " + err);
        return res.status(500).json({
            "error":err
        });
    }

    if(userFound === null) {
        console.log("User not found");
        return res.status(404).json({
            "error":"User not found"
        })
    }

    //creating topic
    try{    
        newTopic = await topicModel.create({
            title:topicTitle,
            user:{
                id:userID,
                name:userFound.firstName
            }
        });
        res.status(200).json({
            "message":"Topic Created"
        })
    } catch(err) {
        console.log("Error : " + err);
        return res.status(500).json({
            "error":err
        });
    }

})

//Function to delete a topic
topicRouter.delete('/delete/:id', async function(req,res) {
    const { id } = req.params;
    //find topic and delete
    try {
        await topicModel.findByIdAndDelete({_id:id})
        return res.status(200).json({
            message:"Topic Deleted"
        })
    } catch(err) {
        console.log("Error  " + err);
        return res.status(500).json({
            "error" : "Failed to delete"
        })
    }
})

//Function to update topic name 
topicRouter.put('/update/:id', async function(req,res) {
    console.log("topicRouter put hitted");
    const { id } = req.params;
    const newTitle = req.body.title;
    try {
        await topicModel.findByIdAndUpdate(
            {
                _id:id
            },{
                title:newTitle
            }
        )
        res.status(200).json({
            message:"Topic Name Updated"
        })
    } catch(err) {
        console.log("Error : " + err);
        return res.status(500).json({
            "error":"Failed to update name "
        })
    }
})

module.exports = {
    topicRouter
}