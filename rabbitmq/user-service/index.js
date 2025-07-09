import express from 'express';
import cors from 'cors';
import connectDB from './db.js';

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

connectDB();

app.listen(PORT, () => {
  console.log(`User Service is running on port ${PORT}`);
});
