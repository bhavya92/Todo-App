const { topicModel, todoListModel, todoModel } = require("../db");
const { userModel } = require("../db");
const { authMiddleware } = require("../middleware/authMiddleware");
const { Router, response } = require("express");

const topicRouter = Router();
topicRouter.use(authMiddleware);

//Function to return all topic names
topicRouter.get("/", async function (req, res) {
  console.log("/topic hitted");
  const userId = req.userId;
  let topicsFound;

  try {
    topicsFound = await topicModel.find({
      "user.id": userId,
    });
    console.log(topicsFound);
    return res.status(200).json({
      status: "200",
      topics: topicsFound,
      message: "Topics FOund",
      error: "None",
    });
  } catch (err) {
    console.log("Error : " + err);
    return res.status(500).json({
      status: "500",
      message: "None",
      error: "Server Error",
    });
  }
});

//Function to create a new topic
topicRouter.post("/new", async function (req, res) {
  console.log("/topic/new hitted");
  console.log("userId " + req.userId);
  const userID = req.userId;
  const topicTitle = req.body.title;
  let userFound, newTopic;
  try {
    userFound = await userModel.findById(userID);
    if (userFound === null) {
      console.log("User not found");
      return res.status(404).json({
        status: "404",
        message: "None",
        error: "User not found",
      });
    }
    newTopic = await topicModel.create({
      title: topicTitle,
      user: {
        id: userID,
        name: userFound.firstName,
      },
    });
    res.status(200).json({
      status: "200",
      message: "Topic Created",
      error: "None",
    });
  } catch (err) {
    console.log("Error : " + err);
    return res.status(500).json({
      status: "500",
      message: "None",
      error: "Server Error",
    });
  }
});

//Function to delete a topic
topicRouter.delete("/delete/:id", async function (req, res) {
  const { id } = req.params;
  let listsFound;
  //find all the lists that belong to that topic -> delete them
  //find all the todos of those lists -> delete them
  //Then delete the topic

  //searching for lists
  try {
    listsFound = await todoListModel.find({
      "topic.id": id,
    });

    const todoListIds = listsFound.map((listsFound) => listsFound.topic.id);

    if (todoListIds.length > 0) {
      //deleting all the todos of those lists
      await todoModel.deleteMany({
        "todoList.id": { $in: todoListIds },
      });

      //deleting the lists
      await todoListModel.deleteMany({
        "topic.id": id,
      });
    }

    //find topic and delete
    await topicModel.findByIdAndDelete({ _id: id });

    return res.status(200).json({
      status: "200",
      message: "Topic Deleted",
      error: "None",
    });
  } catch (err) {
    console.log(err);
    return res.json(500).json({
      status: "500",
      message: "None",
      error: "Server Error",
    });
  }
});

//Function to update topic name
topicRouter.put("/update/:id", async function (req, res) {
  console.log("topicRouter put hitted");
  const { id } = req.params;
  const newTitle = req.body.title;
  try {
    await topicModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        title: newTitle,
      },
    );
    res.status(200).json({
      status: "200",
      message: "Topic Name Updated",
      error: "None",
    });
  } catch (err) {
    console.log("Error : " + err);
    return res.status(500).json({
      status: "500",
      message: "None",
      error: "Server Error",
    });
  }
});

module.exports = {
  topicRouter,
};
