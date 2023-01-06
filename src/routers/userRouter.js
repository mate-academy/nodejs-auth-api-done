import express from 'express';
import { userController } from '../controllers/userController.js';

export const userRouter = new express.Router();

userRouter.get('/', userController.getAll);
