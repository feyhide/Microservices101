import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'analytic-service',
  brokers: ['localhost:9094'],
});

export const consumer = kafka.consumer({ groupId: 'analytic-service' });

export const connectToKafka = async () => {
  try {
    await consumer.connect();
    console.log('Analytic Service: Connected to Kafka as consumer');
  } catch (error) {
    console.error('Analytic Service: Kafka connection failed:', error.message);
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

        const totalNum = cart
          .reduce((acc, item) => acc + item.price, 0)
          .toFixed(2);

        console.log(`Analytic Service Consumer: ${userId} paid ${totalNum}`);
      },
    });

    console.log('Analytic Service is now consuming messages');
  } catch (error) {
    console.error('Error in consumer:', error.message);
  }
};
