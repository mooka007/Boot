const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Store active users and rooms
const users = new Map();
const rooms = new Map();

io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Handle user joining
    socket.on('join', (data) => {
        const { username, room } = data;
        
        // Store user info
        users.set(socket.id, { username, room, id: socket.id });
        
        // Join the room
        socket.join(room);
        
        // Initialize room if it doesn't exist
        if (!rooms.has(room)) {
            rooms.set(room, new Set());
        }
        
        // Add user to room
        rooms.get(room).add(socket.id);
        
        // Notify room about new user
        socket.to(room).emit('user-joined', {
            username,
            message: `${username} joined the chat`,
            timestamp: new Date().toLocaleTimeString()
        });
        
        // Send current users list to the new user
        const roomUsers = Array.from(rooms.get(room)).map(id => {
            const user = users.get(id);
            return user ? { username: user.username, id: user.id } : null;
        }).filter(user => user !== null);
        
        socket.emit('users-list', roomUsers);
        
        // Update users list for all users in the room
        io.to(room).emit('users-list', roomUsers);
        
        console.log(`${username} joined room: ${room}`);
    });

    // Handle sending messages
    socket.on('send-message', (data) => {
        const user = users.get(socket.id);
        if (user) {
            const messageData = {
                username: user.username,
                message: data.message,
                timestamp: new Date().toLocaleTimeString(),
                userId: socket.id
            };
            
            // Send message to all users in the room
            io.to(user.room).emit('receive-message', messageData);
            console.log(`Message from ${user.username} in ${user.room}: ${data.message}`);
        }
    });

    // Handle typing indicators
    socket.on('typing', (data) => {
        const user = users.get(socket.id);
        if (user) {
            socket.to(user.room).emit('user-typing', {
                username: user.username,
                isTyping: data.isTyping
            });
        }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        const user = users.get(socket.id);
        if (user) {
            const { username, room } = user;
            
            // Remove user from room
            if (rooms.has(room)) {
                rooms.get(room).delete(socket.id);
                
                // If room is empty, delete it
                if (rooms.get(room).size === 0) {
                    rooms.delete(room);
                }
            }
            
            // Remove user
            users.delete(socket.id);
            
            // Notify room about user leaving
            socket.to(room).emit('user-left', {
                username,
                message: `${username} left the chat`,
                timestamp: new Date().toLocaleTimeString()
            });
            
            // Update users list for remaining users
            if (rooms.has(room)) {
                const roomUsers = Array.from(rooms.get(room)).map(id => {
                    const user = users.get(id);
                    return user ? { username: user.username, id: user.id } : null;
                }).filter(user => user !== null);
                
                io.to(room).emit('users-list', roomUsers);
            }
            
            console.log(`${username} disconnected from room: ${room}`);
        }
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📱 Open http://localhost:${PORT} in your browser`);
});
