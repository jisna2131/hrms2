import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host:process.env.EMAIL_HOST,
  port:process.env.EMAIL_PORT,
  secure: false,
  auth: { user: process.env.EMAIL_USER,
     pass: process.env.EMAIL_PASS }
});

export async function sendMail({ to,subject, html }) {
  const info = await transporter.sendMail({
 from: process.env.EMAIL_USER,
  to: to,
  subject: subject,
  html: html
  })
  console.log("Email sent");
}
sendMail('jisnakurian357@gmail.com',"this is SUBJECT","This is Test Message")