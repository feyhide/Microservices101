import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'analytic-service',
  brokers: ['localhost:9094'],
});

export const consumer = kafka.consumer({ groupId: 'analytic-service' });

export const connectToKafka = async () => {
  try {
    await consumer.connect();
    console.log('Analytic Service connected to kafka as consumer');

    await consumer.subscribe({
      topic: 'payment-successful',
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {},
    });
  } catch (error) {
    console.log(error.message);
  }
};
