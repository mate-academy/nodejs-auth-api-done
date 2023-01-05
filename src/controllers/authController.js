import { v4 as uuidv4 } from 'uuid';
import { User } from "../models/User.js";
import { emailService } from '../services/emailService.js';

async function register(req, res, next) {
  const { email, password } = req.body;

  const user = await User.create({ email, password });

  const activationToken = uuidv4();

  await emailService.sendActivationMail(email, activationToken);

  res.send(user);
};

export const authContoller = {
  register,
}
