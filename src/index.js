require('dotenv').config();
const { consumeEmails } = require('./rabbitMQ');

const PORT = process.env.PORT;

consumeEmails(); // Start consuming email messages
console.log(`Email service listening on port ${PORT}`);
