/*const nodemailer = require("nodemailer");

const sendNotification = (userEmail, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("");
      console.log("Notification sent: " + info.response);
    }
  });
};

module.exports = sendNotification;
// how to use    hanta at3yt liha o at3mer laibat
//const sendNotification = require("./sendNotification");
// const userEmail= "mostafa.abiou@gmail.com";
// const subject = "your email has been changed";
// const message ="please enter your email address"

// sendNotification(userEmail, subject, message);*/