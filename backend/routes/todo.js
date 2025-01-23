//todo - new , update, delete, done, deletefull -> Authorized
const { Router } = require("express");
const todoRouter = Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const { todoModel, topicModel, todoListModel } = require("../db");
const { userModel } = require("../db");
const e = require("express");
const { default: mongoose } = require("mongoose");

todoRouter.use(authMiddleware);

//Getting all todos
todoRouter.get("/:listId/all", async function (req, res) {
  const { listId } = req.params;
  let todosFound;
  try {
    todosFound = await todoModel.find({
      "todoList.id": listId,
    });
    console.log(todosFound);
    return res.status(200).json({
      status: "200",
      todos: todosFound,
      message: "Todos Found",
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

todoRouter.post("/:id/new", async function (req, res) {
  let userFound, listFound;
  const { id } = req.params;
  console.log("new todo hitted");
  console.log("lis Id typeof" + id);
  try {
    userFound = await userModel.findById(req.userId);

    if (userFound === null) {
      return res.status(404).json({
        status: "404",
        message: "None",
        error: "User not found",
      });
    }

    listFound = await todoListModel.findById(id);

    if (listFound === null) {
      return res.status(404).json({
        status: "404",
        message: "None",
        error: "List not found",
      });
    }

    const newTodo = await todoModel.create({
      title: req.body.title,
      dueDate: req.body.dueDate,
      starred: req.body.starred,
      daily: req.body.daily,
      done: false,
      todoList: {
        id: id,
        title: listFound.title,
      },
      user: {
        id: req.userId,
        name: userFound.firstName,
      },
    });
    res.status(200).json({
      status: "200",
      message: "todo addded",
      error: "None",
      newTodo: newTodo,
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

todoRouter.put("/update/:id", async function (req, res) {
  const { id } = req.params;
  try {
    await todoModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        title: req.body.title,
        dueDate: req.body.dueDate,
        starred: req.body.starred,
        daily: req.body.daily,
        done: req.body.done,
      },
    );
    res.status(200).json({
      status: "200",
      message: "Todo Updated",
      error: "None",
    });
  } catch (err) {
    console.log("Error " + err);
    res.status(500).json({
      status: "500",
      message: "None",
      error: "Server Error",
    });
  }
});

todoRouter.delete("/delete/:id", async function (req, res) {
  const { id } = req.params;
  try {
    await todoModel.findByIdAndDelete(id);
    return res.status(200).json({
      status: "200",
      message: "todo deleted",
      error: "None",
    });
  } catch (err) {
    console.log("Error + " + err);
    return res.status(500).json({
      status: "500",
      message: "None",
      error: "Server Error",
    });
  }
});

module.exports = {
  todoRouter,
};
