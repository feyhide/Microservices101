import amqp from 'amqplib';

let channel, connection;

export async function startConsuming(retries = 10, delay = 5000) {
  while (retries) {
    try {
      connection = await amqp.connect('amqp://rabbitmq');
      channel = await connection.createChannel();

      await channel.assertQueue('task-created');

      console.log('notification-service connected to RabbitMQ');

      channel.consume('task-created', (msg) => {
        const taskData = JSON.parse(msg.content.toString());
        console.log('New Task Added:', taskData);
        channel.ack(msg);
      });

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

startConsuming();
