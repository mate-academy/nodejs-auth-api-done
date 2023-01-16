import { v4 as uuidv4 } from 'uuid';
import { User } from "../models/User.js";
import { emailService } from '../services/emailService.js';
import { jwtService } from '../services/jwtService.js';
import { userService } from '../services/userService.js';

async function login(req, res, next) {
  const { email, password } = req.body;
  // find a user in db
  const user = await userService.findByEmail(email);
  // compare password vs db
  if (password !== user.password) {
    res.sendStatus(401);
    return;
  }
  // generate access token - jwt
  const normalizedUser = userService.normalize(user);
  const accessToken = jwtService.generateAccessToken(normalizedUser);
  // send the object and a token to client
  res.send({
    user: normalizedUser,
    accessToken,
  })
};

async function register(req, res, next) {
  const { email, password } = req.body;

  const activationToken = uuidv4();
  const user = await User.create({ email, password, activationToken });

  await emailService.sendActivationMail(email, activationToken);

  res.send(user);
};

async function activate(req, res, next) {
  const { activationToken } = req.params;

  const user = await User.findOne({
    where: { activationToken }
  });

  if (!user) {
    res.sendStatus(404);
    return;
  }

  user.activationToken = null;
  await user.save();

  res.send(user);
};

export const authContoller = {
  register,
  activate,
  login,
}
