const express = require('express');
const http = require('http');
// const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const HOST_NAME = process.env.HOST_NAME || "0.0.0.0";
const server = http.createServer(app);
const io = require('socket.io')(server);
// const chats = require("./Chats");
// const clients = require("./Clients");

const clients = [];

app.use(express.json());

// app.use(cors());

// const clients = {};

io.on('connection', (socket) => {
    console.log('connection', {id: socket.id, time: Date.now()});

    socket.on('signin', (id) => {
        
        clients[id] = socket;

        console.log({
            event: 'signin ',
            id,
            clients: clients.length,
        });
    });

    socket.on('message', async (msg)  => {
        let client = clients[msg.targetId] || null;
        if (client) {
            await client.emit('message', msg.message);
            console.log(msg, 'sent')
        } else {
            console.log(client);
        }
        console.log({
            event: 'message',
            targetId: msg.targetId,
            clients: clients.length,
        });
    });

    socket.on('disconnect', (_) => {
        console.log('disconnect');
        console.log({
            event: 'disconnect',
            _,
            clients: clients.length,
        });
    });

    socket.on('leave', (id) => {
        
        if (clients[id]) {
            delete clients[id];
        }

        console.log({
            event: 'leave',
            id,
            clients: clients.length,
        });

    })
});

app.route('/check').get(((req, res) => {
    return res.json({
        message:"Your App Working successfully",
    })
}))

server.listen(PORT, HOST_NAME, () => {
    console.log(`http://${HOST_NAME}:${PORT}`)
});
