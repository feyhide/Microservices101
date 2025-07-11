import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'kafka-service',
  brokers: ['localhost:9094', 'localhost:9095', 'localhost:9096'],
});

const admin = kafka.admin();

const run = async () => {
  await admin.connect();
  console.log('Kafka Service connected successfully');

  const created = await admin.createTopics({
    topics: [
      {
        topic: 'payment-successful',
        numPartitions: 3,
        replicationFactor: 3,
      },
      {
        topic: 'email-successful',
        numPartitions: 3,
        replicationFactor: 3,
      },
      {
        topic: 'order-successful',
        numPartitions: 3,
        replicationFactor: 3,
      },
    ],
    waitForLeaders: true,
  });

  if (created) {
    console.log('Kafka Service: Topics created successfully');
  } else {
    console.log('Kafka Service: Topics already exist');
  }

  await admin.disconnect();
};

run().catch(console.error);
