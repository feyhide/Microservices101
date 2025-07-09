import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import taskRoute from './route/task.js';
import { connectRabbitMQWithRetries } from './rabbitmq/connection.js';

const app = express();
const PORT = 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use('/api/v1/task', taskRoute);

connectDB();
await connectRabbitMQWithRetries();

app.listen(PORT, () => {
  console.log(`Task Service is running on port ${PORT}`);
});
