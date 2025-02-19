require("dotenv").config();
const { CronJob } = require('cron');
const { todoModel } = require('../db');
const util = require('util');
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
    console.log("In send_mail");
    console.log(email);
    console.log(text);
    let mailOptions = {
        from: 'TickMaar <tickmaarkl@gmail.com>',
        to: email,
        subject: 'A gentle reminder',
        text: `Hello, This mail is to remind you that you have to complete these by today : ${text}`,
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
    console.log("Satrted Cron Job");
    console.log(today);
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
              email: { $first: "$user.email" }, 
              todos: {
                $push: {
                  title: "$title",
                  id:"$_id"
                },
              },
            },
          },
          {
            $project: {
              _id: 0, 
              email: 1,
              todos: 1,
            },
          },
        ]);
      } catch (error) {
        console.error("Error fetching todos:", error);
        return [];
      }
    console.log("results fetched in cron");
    console.log(util.inspect(results, false, null, true /* enable colors */))

    const formattedData = results.map(item => ({
        email: item.email,
        todos: item.todos.map(todo => todo.title).join(", ")
      }));

      console.log("formattedData");
      console.log(formattedData);
    for(let i=0;i<formattedData.length;i++) {
        console.log(`Inside for ${i}`);
        console.log(formattedData[i].email);
        console.log(formattedData[i].todos);
        await send_mail(formattedData[i].email, formattedData[i].todos);
    }
    // TODO: After sending mails set remind to false and dueDate to 1/1/1
    try {
        for(const items of results) {
            const todoIds = items.todos.map(todo => todo.id);

            await todoModel.updateMany(
                {_id :{ $in:todoIds} },
                {$set : {remind: false, dueDate: "1/1/1"} }
            );
            console.log("DueDate and remind updated");
        }
    } catch(err) {
        console.log("Error Updatind remind and dueDate");
    }

},null,true);

console.log(job.running);
module.exports = job;