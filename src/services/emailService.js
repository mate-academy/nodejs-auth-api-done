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

export function sendActivationMail(to, token) {
  const link = `${process.env.CLIENT_URL}/activation/${token}`

  return sendMail({
    to,
    subject: 'Account activation',
    html: `
      Follow the link below to activate your account
      <a href="${link}">${link}</a>
    `
  })
}

export const emailService = { sendMail, sendActivationMail };
