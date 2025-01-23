const { topicModel, todoModel } = require("../db");
const { todoListModel } = require("../db");
const { authMiddleware } = require("../middleware/authMiddleware");
const { Router } = require("express");
const listRouter = Router();
listRouter.use(authMiddleware);

//Getting all lists
listRouter.get("/:topicId/all", async function (req, res) {
  console.log("/:topicId/all hitted");
  const { topicId } = req.params;
  console.log(topicId);
  let listsFound;
  try {
    listsFound = await todoListModel.find({
      "topic.id": topicId,
    });

    console.log(listsFound);
    if(listsFound.length === 0) {
      return res.status(404).json({
        status: "404",
        message: "No List Exist",
        error: "None",
      });      
    }
    return res.status(200).json({
      status: "200",
      message: "Lists Found",
      error: "None",
      todoLists: listsFound,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "500",
      message: "None",
      error: "Failed to get the lists",
    });
  }
});

//creating new list

listRouter.post("/:topicId/new", async function (req, res) {
  console.log("/:topicId/new hitted");
  const { topicId } = req.params;
  const listTitle = req.body.title;
  let topicFound;

  try {
    topicFound = await topicModel.findById(topicId);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "500",
      message: "None",
      error: "Server Error",
    });
  }

  if (topicFound === null) {
    console.log("Topic not found");
    return res.status(404).json({
      status: "404",
      message: "None",
      error: "Topic not found",
    });
  }

  try {
    const newList = await todoListModel.create({
      title: listTitle,
      topic: {
        id: topicId,
        title: topicFound.title,
      },
    });
    console.log('New List Created');
    console.log(newList);
    return res.status(200).json({
      status: "200",
      message: "list created",
      error: "None",
      newList:newList,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "500",
      message: "None",
      error: "Failed to create new list",
    });
  }
});

//deleting a list
listRouter.delete("/delete/:id", async function (req, res) {
  console.log('Deleting list');
  const { id } = req.params;
  console.log(id);

  try {
    const noOfDelete = await todoModel.deleteMany( 
      {
        'todoList.id':{ $eq:id }
      } 
    )
    console.log(noOfDelete);

    await todoListModel.findByIdAndDelete(id);

    return res.status(200).json({
      status: "200",
      message: "List Deleted",
      erroe: "None",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "500",
      message: "None",
      error: "Server Error",
    });
  }
});

//updating list name
listRouter.put("/update/:id", async function (req, res) {
  const { id } = req.params;
  const newTitle = req.body.title;
  try {
    await todoListModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        title: newTitle,
      },
    );
    return res.status(200).json({
      status: "200",
      message: "list title updated",
      error: "None",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "500",
      message: "None",
      error: "Server Error",
    });
  }
});

module.exports = {
  listRouter,
};
