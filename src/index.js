import 'dotenv/config';
import express from 'express';
import { authRouter } from './routers/authRouter.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(authRouter);

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(PORT);
