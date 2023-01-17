import { ApiError } from "../exceptions/ApiError.js";
import { User } from "../models/User.js";
import { v4 as uuidv4 } from 'uuid';
import { emailService } from '../services/emailService.js';

async function getAllActive() {
  return User.findAll({
    where: { activationToken: null }
  })
}

function findByEmail(email) {
  return User.findOne({
    where: { email }
  })
}

function normalize({ id, email }) {
  return { id, email }
}

async function register({ email, password}) {
  const existingUser = await findByEmail(email);

  if (existingUser) {
    throw ApiError.BadRequest('Email is already registered', {
      email: 'Email is already registered'
    })
  }

  const activationToken = uuidv4();
  await User.create({ email, password, activationToken });

  await emailService.sendActivationMail(email, activationToken);
}

export const userService = {
  getAllActive,
  normalize,
  findByEmail,
  register,
}
