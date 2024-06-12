import nodemailer from "nodemailer";
import env from "dotenv";
env.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.email, // Replace with your email
    pass: process.env.password, // Replace with your email password
  },
});

const sendEmail = (to, subject, text) => {
  console.log(process.env.email, process.env.password);
  const mailOptions = {
    from: process.env.email, // Replace with your email
    to,
    subject,
    text,
  };
  console.log(mailOptions);
  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
