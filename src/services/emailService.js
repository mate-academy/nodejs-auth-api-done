import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export function sendMail({ to, subject, html }) {
  return transporter.sendMail({
    from: 'Auth API',
    to,
    subject,
    text: '',
    html,
  })
}
