import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'payment-service',
  brokers: ['localhost:9094'],
});

export const producer = kafka.producer();

export const connectToKafka = async () => {
  try {
    await producer.connect();
    console.log('Payment Service connected to kafka as producer');
  } catch (error) {
    console.log(error.message);
  }
};
