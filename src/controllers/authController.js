import { ApiError } from "../exceptions/ApiError.js";
import { User } from "../models/User.js";
import { jwtService } from '../services/jwtService.js';
import { userService } from '../services/userService.js';

function validateEmail(value) {
  if (!value) {
    return 'Email is required';
  }

  const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  if (!emailPattern.test(value)) {
    return 'Email is not valid';
  }
};

const validatePassword = (value) => {
  if (!value) {
    return 'Password is required';
  }

  if (value.length < 6) {
    return 'At least 6 characters';
  }
};

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

  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
  }

  if (errors.email || errors.password) {
    throw ApiError.BadRequest('Validation error', errors)
  }

  await userService.register({ email, password });

  res.send({ message: 'User is registered' });
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
