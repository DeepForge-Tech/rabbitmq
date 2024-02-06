const express = require('express');
const app = express();
const amqp = require('amqplib');
// const server = require('http').Server(app);
// const io = require('socket.io')(server);
var channel;

amqp.connect("amqp://guest:guest@rabbitmq-0g41.onrender.com")
    .then((connection) => connection.createChannel())
    .then((_channel) => {
        channel = _channel;
        app.use(express.json()); // Add this line to parse JSON bodies

        app.get('/', (req, res) => {
            res.send('Real-Time Application');
        });

        app.post('/api/log', (req, res) => {
            try {
                
                if (req.body)
                {
                    var architecture = req.body && req.body.architecture;
                    //   const message = req.body && req.body.mes;
                    channel.assertExchange('direct_exchange', 'direct', { durable: false });
                    // Publish the message to RabbitMQ
                    channel.publish('direct_exchange', 'chat', Buffer.from(architecture));
                    //   const jsonData = req.body;
                    res.json({message: "Success"});
                // res.json({ message: 'JSON data received', data: jsonData });
                }
            }
            catch (error) {
                return res.status(400).send('Bad Request: Missing message in request body');
            }
        });

        app.listen(process.env.PORT || 80, () => {
            console.log('Server started on port 80');
        });

        // server.listen(80, () => {
        //   console.log('Server started on port 3000');
        // });
});