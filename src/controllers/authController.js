import bcrypt from 'bcrypt';
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

  const user = await userService.findByEmail(email);

  if (!user) {
    throw ApiError.BadRequest('User with such email is not found');
  }

  const isPasswordValid = await bcrypt
    .compare(password, user.password);

  if (!isPasswordValid) {
    throw ApiError.BadRequest('Password is wrong');
  }

  sendAuth(res, user);
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

async function refresh(req, res, next) {
  const { refreshToken } = req.cookies;

  const userData = jwtService.verifyRefreshToken(refreshToken);

  if (!userData) {
    throw ApiError.Unahtorized();
  }

  const user = await userService.findByEmail(userData.email);

  sendAuth(res, user);
};

function sendAuth(res, user) {
  const normalizedUser = userService.normalize(user);
  const accessToken = jwtService.generateAccessToken(normalizedUser);
  const refreshToken = jwtService.generateRefreshToken(normalizedUser);

  res.cookie('refreshToken', refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  res.send({
    user: normalizedUser,
    accessToken,
  });
}

export const authContoller = {
  register,
  activate,
  login,
  refresh,
}
