// Used for local development and e2e testing
import nodemailer from 'nodemailer';

const host = process.env.EMAIL_SERVER_HOST || 'smtp.gmail.com';
const port = parseInt(process.env.EMAIL_SERVER_PORT, 10) || 587;
const user = process.env.EMAIL_SERVER_USER;
const pass = process.env.EMAIL_SERVER_PASSWORD;

const transporter = nodemailer.createTransport({
  host,
  port,
  secure: false, // true for 465, false for other ports
  auth: {
    user,
    pass,
  },
});

export default transporter;
