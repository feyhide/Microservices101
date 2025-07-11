import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'analytic-service',
  brokers: ['localhost:9094'],
});

export const consumer = kafka.consumer({ groupId: 'analytic-service' });

export const connectConsumerToKafka = async () => {
  try {
    await consumer.connect();
    console.log('Analytic Service: Connected to Kafka as consumer');
  } catch (error) {
    console.error('Analytic Service: Kafka connection failed:', error.message);
  }
};

export const startConsuming = async () => {
  try {
    await consumer.subscribe({
      topics: ['payment-successful', 'email-successful', 'order-successful'],
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        switch (topic) {
          case 'payment-successful':
            {
              const value = message.value.toString();
              const { userId, cart } = JSON.parse(value);

              const totalNum = cart
                .reduce((acc, item) => acc + item.price, 0)
                .toFixed(2);

              console.log(
                `Analytic Service Consumer: ${userId} paid ${totalNum}`
              );
            }
            break;
          case 'order-successful':
            {
              const value = message.value.toString();
              const { userId, orderId } = JSON.parse(value);

              console.log(
                `Analytic Service Consumer: Order Created For ${userId} with orderId: ${orderId}`
              );
            }
            break;
          case 'email-successful':
            {
              const value = message.value.toString();
              const { userId, email, orderId } = JSON.parse(value);

              console.log(
                `Analytic Service Consumer: Email sended to ${email} regarding their userId: ${userId}, orderId: ${orderId}`
              );
            }
            break;
          default:
            break;
        }
      },
    });

    console.log('Analytic Service is now consuming messages');
  } catch (error) {
    console.error('Analytic Service: Error in consumer:', error.message);
  }
};
