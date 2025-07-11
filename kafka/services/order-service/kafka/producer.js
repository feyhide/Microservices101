import { kafka } from './kafka-config.js';

export const producer = kafka.producer();

export const connectProducerToKafka = async () => {
  try {
    await producer.connect();
    console.log('Order Service: Connected to Kafka as producer');
  } catch (error) {
    console.error(
      'Order Service: Kafka connection failed as producer:',
      error.message
    );
  }
};
