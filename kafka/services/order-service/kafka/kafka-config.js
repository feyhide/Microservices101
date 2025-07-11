import { Kafka } from 'kafkajs';

export const kafka = new Kafka({
  clientId: 'order-service',
  brokers: ['localhost:9094', 'localhost:9095', 'localhost:9096'],
});
