import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { authRouter } from './routers/authRouter.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());
app.use(authRouter);

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(PORT);
