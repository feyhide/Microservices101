import { connectToKafka, startConsuming, consumer } from './kafka/consumer.js';

const start = async () => {
  console.log('Starting Analytic Service...');

  await connectToKafka();
  await startConsuming();

  process.on('SIGINT', async () => {
    console.log('Analyic Service: Disconnecting Kafka consumer...');
    await consumer.disconnect();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    console.log('Analyic Service: Disconnecting Kafka consumer...');
    await consumer.disconnect();
    process.exit(0);
  });
};

start();
