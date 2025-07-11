import {
  connectConsumerToKafka,
  consumer,
  startConsuming,
} from './kafka/consumer.js';
import { connectProducerToKafka, producer } from './kafka/producer.js';

const start = async () => {
  console.log('Starting Email Service...');

  await connectConsumerToKafka();
  await connectProducerToKafka();
  await startConsuming();

  process.on('SIGINT', async () => {
    console.log('Email Service: Disconnecting Kafka consumer && producer...');
    await consumer.disconnect();
    await producer.disconnect();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    console.log('Email Service: Disconnecting Kafka consumer && producer...');
    await consumer.disconnect();
    await producer.disconnect();
    process.exit(0);
  });
};

start();
