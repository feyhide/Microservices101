import express from 'express';
import cors from 'cors';
import paymentRoutes from './routes/payment.js';

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use('/', paymentRoutes);

app.listen(PORT, () => {
  console.log(`Payment Service is running on port ${PORT}`);
});
