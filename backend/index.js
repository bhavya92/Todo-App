require("dotenv").config();
require("./services/reminder.js")
console.log(process.env.MONGO_URL);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const cookieParser = require("cookie-parser");

const { userRouter } = require("./routes/user");
const { todoRouter } = require("./routes/todo");
const { topicRouter } = require("./routes/topic");
const { listRouter } = require("./routes/list");


const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(cookieParser());
app.use("/user", userRouter);
app.use("/todo", todoRouter);
app.use("/topic", topicRouter);
app.use("/list", listRouter);


async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
   
    app.listen(parseInt(process.env.PORT));
    console.log("Listening on Port 3000");
  } catch (error) {
    console.log("Error connecting to DB " + error);
  }
}

main();
