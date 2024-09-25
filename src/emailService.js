const nodemailer = require('nodemailer');

async function sendEmail(mail) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: mail.to,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent');
  } catch (error) {
    console.error('Error sending email', error);
  }
}

module.exports = { sendEmail };
