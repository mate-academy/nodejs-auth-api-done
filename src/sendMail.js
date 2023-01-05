import 'dotenv/config';
import { sendMail } from "./services/emailService.js";

sendMail({
  to: 'barite4829@cnxcoin.com',
  subject: 'Test register',
  html: '<h1>Registration success</h1>'
})
