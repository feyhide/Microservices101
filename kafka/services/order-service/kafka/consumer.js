import { kafka } from './kafka-config.js';
import { producer } from './producer.js';

export const consumer = kafka.consumer({ groupId: 'order-service' });

export const connectConsumerToKafka = async () => {
  try {
    await consumer.connect();
    console.log('Order Service: Connected to Kafka as consumer');
  } catch (error) {
    console.error(
      'Order Service: Kafka connection failed as consumer:',
      error.message
    );
  }
};

export const startConsuming = async () => {
  try {
    await consumer.subscribe({
      topic: 'payment-successful',
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const value = message.value.toString();
        const { userId, cart } = JSON.parse(value);

        const dummyOrderId = '1234abc';

        console.log(
          `Order Service: Order Created Successfully for ${userId} orderId: ${dummyOrderId} with cart detail as ${cart}`
        );

        await producer.send({
          topic: 'order-successful',
          messages: [
            { value: JSON.stringify({ userId, orderId: dummyOrderId }) },
          ],
        });
        console.log(
          'Order Service: Produces message in topic: order-successful'
        );
      },
    });

    console.log('Order Service is now consuming messages');
  } catch (error) {
    console.error('Order Service: Error in consumer:', error.message);
  }
};
