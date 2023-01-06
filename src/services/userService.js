import { User } from "../models/User.js";

async function getAllActive() {
  return User.findAll({
    where: { activationToken: null }
  })
}

export const userService = {
  getAllActive,
}
