import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'payment-service',
  brokers: ['localhost:9094', 'localhost:9095', 'localhost:9096'],
});

export const producer = kafka.producer();

export const connectProducerToKafka = async () => {
  try {
    await producer.connect();
    console.log('Payment Service connected to kafka as producer');
  } catch (error) {
    console.log(error.message);
  }
};
