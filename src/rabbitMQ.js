const amqp = require('amqplib');
const { sendEmail } = require('./emailService');

async function consumeEmails() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    
    await channel.assertQueue('email_queue', { durable: true });
    
    console.log('Waiting for email requests...');
    
    channel.consume('email_queue', (message) => {
      const mail = JSON.parse(message.content.toString());
      sendEmail(mail);
      
      // Acknowledge the message
      channel.ack(message);
    }, { noAck: false });
  } catch (error) {
    console.error('Error consuming email requests:', error);
  }
}

module.exports = { consumeEmails };
