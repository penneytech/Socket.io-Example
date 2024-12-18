// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files (client)
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A client connected:', socket.id);

    // Listen for 'send-random-id' events from the client
    socket.on('send-random-id', (randomId) => {
        console.log(`Received random ID from ${socket.id}: ${randomId}`);

        // Broadcast the random ID to all other clients
        socket.broadcast.emit('receive-random-id', randomId);
    });

    socket.on('disconnect', () => {
        console.log('A client disconnected:', socket.id);
    });
    
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
