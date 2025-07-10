import { producer } from '../kafka/producer.js';

export const getPayment = async (req, res) => {
  try {
    const { cart } = req.body;

    if (!cart) {
      return res.status(400).json('Cart details required');
    }

    const userId = '123';

    console.log('api endpoint hit');
    // TODO: payment

    // KAFKA
    await producer.send({
      topic: 'payment-successful',
      messages: [{ value: JSON.stringify({ userId, cart }) }],
    });

    return res.status(200).json('Payment Successful');
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(error.message || 'internal service error');
  }
};
