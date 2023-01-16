import { User } from "../models/User.js";

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

export const userService = {
  getAllActive,
  normalize,
  findByEmail,
}
