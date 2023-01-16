import express from 'express';
import { authContoller } from '../controllers/authController.js';

export const authRouter = new express.Router();

authRouter.post('/register', authContoller.register)
authRouter.get('/activation/:activationToken', authContoller.activate)
authRouter.post('/login', authContoller.login)
