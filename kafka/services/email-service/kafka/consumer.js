import { kafka } from './kafka-config.js';
import { producer } from './producer.js';

export const consumer = kafka.consumer({ groupId: 'email-service' });

export const connectConsumerToKafka = async () => {
  try {
    await consumer.connect();
    console.log('Email Service: Connected to Kafka as consumer');
  } catch (error) {
    console.error(
      'Email Service: Kafka connection failed as consumer:',
      error.message
    );
  }
};

export const startConsuming = async () => {
  try {
    await consumer.subscribe({
      topic: 'order-successful',
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const value = message.value.toString();
        const { userId, orderId } = JSON.parse(value);

        const dummyEmail = 'abc@abc.com';

        console.log(
          `Email Service: Email Successfully sended to ${dummyEmail} with orderId: ${orderId}`
        );

        await producer.send({
          topic: 'email-successful',
          messages: [
            { value: JSON.stringify({ userId, email: dummyEmail, orderId }) },
          ],
        });
        console.log(
          'Email Service: Produces message in topic: email-successful'
        );
      },
    });

    console.log('Email Service is now consuming messages');
  } catch (error) {
    console.error('Email Service: Error in consumer:', error.message);
  }
};
