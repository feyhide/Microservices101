import { Kafka } from 'kafkajs';

export const kafka = new Kafka({
  clientId: 'email-service',
  brokers: ['localhost:9094'],
});
