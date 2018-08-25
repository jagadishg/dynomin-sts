const AWS = require('aws-sdk');
const { createServer } = require('dynamodb-admin');

AWS.config.update({
    region: 'ap-south-1',
    sessionToken: process.env.AWS_SESSION_TOKEN,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamodb = new AWS.DynamoDB();
const dynClient = new AWS.DynamoDB.DocumentClient({
    service: dynamodb
});

const app = createServer(dynamodb, dynClient);

const port = process.env.DYNOMIN_PORT || 9000;
const server = app.listen(port);
server.on('listening', () => {
    const address = server.address();
    console.log(`listening on http://0.0.0.0:${address.port}`);
});