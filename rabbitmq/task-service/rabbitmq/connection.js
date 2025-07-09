import amqp from 'amqplib';

let channel, connection;

export async function connectRabbitMQWithRetries(retries = 10, delay = 5000) {
  while (retries > 0) {
    try {
      connection = await amqp.connect('amqp://rabbitmq');
      channel = await connection.createChannel();

      await channel.assertQueue('task-created');

      console.log('task-service connected to RabbitMQ');

      break;
    } catch (error) {
      console.error(
        `Failed to connect to RabbitMQ (${11 - retries}/10):`,
        error.message
      );

      retries--;

      if (retries === 0) {
        console.error('Could not connect to RabbitMQ after multiple attempts.');
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

export { channel, connection };
