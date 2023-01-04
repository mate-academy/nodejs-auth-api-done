import { User } from "../models/User.js"

async function register(req, res, next) {
  const { email, password } = req.body;

  const user = await User.create({ email, password });

  res.send(user);
};

export const authContoller = {
  register,
}