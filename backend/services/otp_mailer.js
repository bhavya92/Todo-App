require("dotenv").config();
const nodemailer = require("nodemailer");

async function generate_mail(email, otp) {
    let transporter = nodemailer.createTransport({
        service: process.env.EMAIL_CLIENT,
        auth: {
            user: process.env.EMAIL_CLIENT_USERNAME,
            pass: process.env.EMAIL_CLIENT_PASSWORD,
        },
    });

    let mailOptions = {
        from: 'TickMaar <tickmaarkl@gmail.com>',
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP is ${otp}`,
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

module.exports  = { generate_mail }