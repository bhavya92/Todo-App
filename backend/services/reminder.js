require("dotenv").config();
const { CronJob } = require('cron');
const { todoModel } = require('../db');
const nodemailer = require("nodemailer");

console.log("REMIDER");

let transporter = nodemailer.createTransport({
    service: process.env.EMAIL_CLIENT,
    auth: {
        user: process.env.EMAIL_CLIENT_USERNAME,
        pass: process.env.EMAIL_CLIENT_PASSWORD,
    },
});

async function send_mail(email, text) {

    let mailOptions = {
        from: 'TickMaar <tickmaarkl@gmail.com>',
        to: email,
        subject: 'A gentle reminder',
        text: `Hello, This mail is to remind you that you have to complete this todo by today : ${text}`,
    }

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Mail sent %s',info.messageId);
        return '1';
    } catch(err) {
        console.log('Error Occured Sending mail');
        console.log(err);
        return '0';
    }
}

const job = new CronJob('00 00 07 * * *', async function(){
    let today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1).toString() : (today.getMonth() + 1).toString(); 
    const date = today.getDate() < 10 ? "0" + today.getDate().toString() : today.getDate().toString(); 
    today = date+"/"+month+"/"+year;
    let results;
    try {
        results = await todoModel.aggregate([
          {
            $match: {
              dueDate: today, 
              remind: true, 
            },
          },
          {
            $lookup: {
              from: "users", 
              localField: "user.id", 
              foreignField: "_id", 
              as: "user", 
            },
          },
          {
            $unwind: "$user", 
          },
          {
            $group: {
              _id: "$user.email", 
              userEmail: { $first: "$user.email" }, 
              todos: {
                $push: {
                  title: "$title",
                },
              },
            },
          },
          {
            $project: {
              _id: 0, 
              userEmail: 1,
              todos: 1,
            },
          },
        ]);
      } catch (error) {
        console.error("Error fetching todos:", error);
        return [];
      }
    console.log(results);
    
    const formattedData = results.map(item => ({
        itemEmail: item.userEmail,
        todos: item.todos.map(todo => todo.title).join(", ")
      }));

    for(let i=0;i<formattedData.length;i++) {
        await send_mail(formattedData[i].userEmail, formattedData[i].todos);
    }

},null,true);

console.log(job.running);
module.exports = job;