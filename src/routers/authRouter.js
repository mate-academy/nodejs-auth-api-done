import express from 'express';
import { authContoller } from '../controllers/authController.js';
import { catchError } from '../utils/catchError.js';

export const authRouter = new express.Router();

authRouter.post('/register', catchError(authContoller.register))
authRouter.get('/activation/:activationToken', catchError(authContoller.activate))
authRouter.post('/login', catchError(authContoller.login))
