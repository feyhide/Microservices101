import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'kafka-service',
  brokers: ['localhost:9094'],
});

const admin = kafka.admin();

const run = async () => {
  await admin.connect();
  console.log('Kafka Service connected successfully');

  const created = await admin.createTopics({
    topics: [
      { topic: 'payment-successful' },
      { topic: 'email-successful' },
      { topic: 'order-successful' },
    ],
    waitForLeaders: true,
  });

  if (created) {
    console.log('Kafka Service: Topics created successfully');
  } else {
    console.log('Kafka Service: Topics already exist');
  }
};

run().catch(console.error);
