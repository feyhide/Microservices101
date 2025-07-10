import { producer } from '../kafka/producer.js';

export const getPayment = async (req, res) => {
  try {
    const { cart } = req.body;

    const userId = '123';

    console.log('api endpoint hit');
    // TODO: payment

    // KAFKA
    await producer.send({
      topic: 'payment-successful',
      messages: [{ value: JSON.stringify({ userId, cart }) }],
    });

    res.status(200).json('Payment Successful');
  } catch (error) {
    res
      .status(error.status || 500)
      .json(error.message || 'internal service error');
  }
};
