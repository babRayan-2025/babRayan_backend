const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

async function sendEmail({ to, subject, template, context  }) {
  const templatePath = path.join(__dirname, `../view/${template}.ejs`);
  const html = await ejs.renderFile(templatePath, context);

  await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject,
    html,
  });
}

module.exports = sendEmail;
