#!/bin/bash

# Real-time Chat Application Generator
# This script creates a complete chat application with Express, Socket.io, and HTML/CSS

echo "🚀 Creating Real-time Chat Application..."

# Create project directory
PROJECT_NAME="realtime-chat-app"
mkdir -p "$PROJECT_NAME"
cd "$PROJECT_NAME"

echo "📁 Setting up project structure..."

# Initialize npm project
cat > package.json << 'EOF'
{
  "name": "realtime-chat-app",
  "version": "1.0.0",
  "description": "Real-time chat application with Express and Socket.io",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "socket.io": "^4.7.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  },
  "keywords": ["chat", "realtime", "socket.io", "express"],
  "author": "Your Name",
  "license": "MIT"
}
EOF

# Create server.js
cat > server.js << 'EOF'
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
EOF

# Create public directory
mkdir -p public

# Create index.html
cat > public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Real-time Chat App</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
    <!-- Username Selection Screen -->
    <div id="username-screen" class="screen">
        <div class="username-container">
            <div class="logo">
                <i class="fas fa-comments"></i>
                <h1>Real-time Chat</h1>
            </div>
            <div class="username-form">
                <h2>Join the Chat</h2>
                <input type="text" id="username-input" placeholder="Enter your username" maxlength="20">
                <input type="text" id="room-input" placeholder="Enter room name (optional)" maxlength="20">
                <button id="join-btn">
                    <i class="fas fa-sign-in-alt"></i>
                    Join Chat
                </button>
            </div>
        </div>
    </div>

    <!-- Chat Screen -->
    <div id="chat-screen" class="screen hidden">
        <div class="chat-container">
            <!-- Header -->
            <div class="chat-header">
                <div class="room-info">
                    <i class="fas fa-hashtag"></i>
                    <span id="current-room">general</span>
                </div>
                <div class="user-info">
                    <i class="fas fa-user"></i>
                    <span id="current-user"></span>
                    <button id="leave-btn" class="leave-btn">
                        <i class="fas fa-sign-out-alt"></i>
                    </button>
                </div>
            </div>

            <div class="chat-main">
                <!-- Users List -->
                <div class="users-panel">
                    <div class="users-header">
                        <i class="fas fa-users"></i>
                        <span>Online Users</span>
                        <span id="users-count" class="users-count">0</span>
                    </div>
                    <div id="users-list" class="users-list"></div>
                </div>

                <!-- Chat Area -->
                <div class="chat-area">
                    <div id="messages-container" class="messages-container"></div>
                    <div id="typing-indicator" class="typing-indicator hidden"></div>
                    
                    <!-- Message Input -->
                    <div class="message-input-container">
                        <input type="text" id="message-input" placeholder="Type a message..." maxlength="500">
                        <button id="send-btn">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Notification -->
    <div id="notification" class="notification hidden">
        <i class="fas fa-bell"></i>
        <span id="notification-text"></span>
    </div>

    <script src="/socket.io/socket.io.js"></script>
    <script src="script.js"></script>
</body>
</html>
EOF

# Create style.css
cat > public/style.css << 'EOF'
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    color: #333;
}

.screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.hidden {
    display: none !important;
}

/* Username Screen */
.username-container {
    background: white;
    padding: 2rem;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    text-align: center;
    max-width: 400px;
    width: 90%;
}

.logo {
    margin-bottom: 2rem;
}

.logo i {
    font-size: 3rem;
    color: #667eea;
    margin-bottom: 1rem;
}

.logo h1 {
    color: #333;
    font-size: 2rem;
    font-weight: 300;
}

.username-form h2 {
    margin-bottom: 1.5rem;
    color: #555;
    font-weight: 400;
}

.username-form input {
    width: 100%;
    padding: 1rem;
    margin-bottom: 1rem;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
}

.username-form input:focus {
    outline: none;
    border-color: #667eea;
}

.username-form button {
    width: 100%;
    padding: 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    cursor: pointer;
    transition: transform 0.2s ease;
}

.username-form button:hover {
    transform: translateY(-2px);
}

.username-form button:active {
    transform: translateY(0);
}

/* Chat Screen */
.chat-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: white;
    margin: 20px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.chat-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.room-info, .user-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.leave-btn {
    background: rgba(255,255,255,0.2);
    border: none;
    color: white;
    padding: 0.5rem;
    border-radius: 8px;
    cursor: pointer;
    margin-left: 1rem;
    transition: background 0.3s ease;
}

.leave-btn:hover {
    background: rgba(255,255,255,0.3);
}

.chat-main {
    flex: 1;
    display: flex;
    overflow: hidden;
}

/* Users Panel */
.users-panel {
    width: 250px;
    background: #f8f9fa;
    border-right: 1px solid #e0e0e0;
    display: flex;
    flex-direction: column;
}

.users-header {
    padding: 1rem;
    background: #e9ecef;
    border-bottom: 1px solid #dee2e6;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
}

.users-count {
    background: #667eea;
    color: white;
    padding: 0.2rem 0.5rem;
    border-radius: 12px;
    font-size: 0.8rem;
    margin-left: auto;
}

.users-list {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
}

.user-item {
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    background: white;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: background 0.2s ease;
}

.user-item:hover {
    background: #e9ecef;
}

.user-item i {
    color: #28a745;
}

/* Chat Area */
.chat-area {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.messages-container {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
    scroll-behavior: smooth;
}

.message {
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 15px;
    max-width: 70%;
    word-wrap: break-word;
    animation: fadeIn 0.3s ease;
}

.message.own {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    margin-left: auto;
    border-bottom-right-radius: 5px;
}

.message.other {
    background: #f1f3f4;
    color: #333;
    border-bottom-left-radius: 5px;
}

.message-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    opacity: 0.8;
}

.message-username {
    font-weight: 600;
}

.message-time {
    font-size: 0.8rem;
}

.message-text {
    line-height: 1.4;
}

.system-message {
    text-align: center;
    color: #666;
    font-style: italic;
    margin: 1rem 0;
    padding: 0.5rem;
    background: #f8f9fa;
    border-radius: 10px;
}

/* Typing Indicator */
.typing-indicator {
    padding: 0.5rem 1rem;
    color: #666;
    font-style: italic;
    font-size: 0.9rem;
}

.typing-dots {
    display: inline-block;
    animation: blink 1.4s infinite;
}

/* Message Input */
.message-input-container {
    display: flex;
    padding: 1rem;
    background: #f8f9fa;
    border-top: 1px solid #e0e0e0;
    gap: 1rem;
}

#message-input {
    flex: 1;
    padding: 1rem;
    border: 2px solid #e0e0e0;
    border-radius: 25px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.3s ease;
}

#message-input:focus {
    border-color: #667eea;
}

#send-btn {
    padding: 1rem 1.5rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    transition: transform 0.2s ease;
}

#send-btn:hover {
    transform: scale(1.05);
}

#send-btn:active {
    transform: scale(0.95);
}

/* Notification */
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: #28a745;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    z-index: 1000;
    animation: slideIn 0.3s ease;
}

.notification.error {
    background: #dc3545;
}

/* Animations */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
}

@keyframes blink {
    0%, 20% { opacity: 1; }
    50% { opacity: 0.5; }
    80%, 100% { opacity: 1; }
}

/* Responsive Design */
@media (max-width: 768px) {
    .chat-container {
        margin: 0;
        border-radius: 0;
        height: 100vh;
    }
    
    .users-panel {
        width: 200px;
    }
    
    .message {
        max-width: 85%;
    }
    
    .chat-header {
        padding: 1rem;
    }
    
    .chat-header .user-info span {
        display: none;
    }
}

@media (max-width: 600px) {
    .users-panel {
        display: none;
    }
    
    .message {
        max-width: 95%;
    }
}

/* Scrollbar Styling */
::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
    background: #999;
}
EOF

# Create script.js
cat > public/script.js << 'EOF'
class ChatApp {
    constructor() {
        this.socket = io();
        this.currentUser = null;
        this.currentRoom = 'general';
        this.isTyping = false;
        this.typingTimeout = null;
        
        this.initializeElements();
        this.setupEventListeners();
        this.setupSocketListeners();
    }

    initializeElements() {
        // Screens
        this.usernameScreen = document.getElementById('username-screen');
        this.chatScreen = document.getElementById('chat-screen');
        
        // Username screen elements
        this.usernameInput = document.getElementById('username-input');
        this.roomInput = document.getElementById('room-input');
        this.joinBtn = document.getElementById('join-btn');
        
        // Chat screen elements
        this.currentUserSpan = document.getElementById('current-user');
        this.currentRoomSpan = document.getElementById('current-room');
        this.leaveBtn = document.getElementById('leave-btn');
        this.usersCount = document.getElementById('users-count');
        this.usersList = document.getElementById('users-list');
        this.messagesContainer = document.getElementById('messages-container');
        this.typingIndicator = document.getElementById('typing-indicator');
        this.messageInput = document.getElementById('message-input');
        this.sendBtn = document.getElementById('send-btn');
        this.notification = document.getElementById('notification');
        this.notificationText = document.getElementById('notification-text');
    }

    setupEventListeners() {
        // Username screen
        this.joinBtn.addEventListener('click', () => this.joinChat());
        this.usernameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.joinChat();
        });
        this.roomInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.joinChat();
        });

        // Chat screen
        this.leaveBtn.addEventListener('click', () => this.leaveChat());
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Typing indicator
        this.messageInput.addEventListener('input', () => {
            this.handleTyping();
        });

        // Focus on username input when page loads
        this.usernameInput.focus();
    }

    setupSocketListeners() {
        this.socket.on('receive-message', (data) => {
            this.displayMessage(data);
            if (data.username !== this.currentUser) {
                this.showNotification(`New message from ${data.username}`);
                this.playNotificationSound();
            }
        });

        this.socket.on('user-joined', (data) => {
            this.displaySystemMessage(data.message, data.timestamp);
            this.showNotification(data.message);
        });

        this.socket.on('user-left', (data) => {
            this.displaySystemMessage(data.message, data.timestamp);
        });

        this.socket.on('users-list', (users) => {
            this.updateUsersList(users);
        });

        this.socket.on('user-typing', (data) => {
            this.showTypingIndicator(data.username, data.isTyping);
        });

        this.socket.on('connect_error', () => {
            this.showNotification('Connection error. Please try again.', 'error');
        });

        this.socket.on('disconnect', () => {
            this.showNotification('Disconnected from server', 'error');
        });
    }

    joinChat() {
        const username = this.usernameInput.value.trim();
        const room = this.roomInput.value.trim() || 'general';

        if (!username || username.length < 2) {
            this.showNotification('Please enter a valid username (at least 2 characters)', 'error');
            this.usernameInput.focus();
            return;
        }

        if (username.length > 20) {
            this.showNotification('Username too long (max 20 characters)', 'error');
            return;
        }

        this.currentUser = username;
        this.currentRoom = room;

        // Update UI
        this.currentUserSpan.textContent = username;
        this.currentRoomSpan.textContent = room;

        // Join the chat
        this.socket.emit('join', { username, room });

        // Switch screens
        this.usernameScreen.classList.add('hidden');
        this.chatScreen.classList.remove('hidden');

        // Focus on message input
        this.messageInput.focus();

        this.showNotification(`Welcome to ${room}!`);
    }

    leaveChat() {
        this.socket.disconnect();
        this.socket.connect();
        
        // Clear data
        this.currentUser = null;
        this.currentRoom = 'general';
        this.messagesContainer.innerHTML = '';
        this.usersList.innerHTML = '';
        this.usernameInput.value = '';
        this.roomInput.value = '';
        this.messageInput.value = '';

        // Switch screens
        this.chatScreen.classList.add('hidden');
        this.usernameScreen.classList.remove('hidden');

        // Focus on username input
        this.usernameInput.focus();
    }

    sendMessage() {
        const message = this.messageInput.value.trim();
        
        if (!message) return;

        if (message.length > 500) {
            this.showNotification('Message too long (max 500 characters)', 'error');
            return;
        }

        this.socket.emit('send-message', { message });
        this.messageInput.value = '';
        
        // Stop typing indicator
        this.socket.emit('typing', { isTyping: false });
        this.isTyping = false;
    }

    displayMessage(data) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${data.userId === this.socket.id ? 'own' : 'other'}`;

        const messageHeader = document.createElement('div');
        messageHeader.className = 'message-header';

        const username = document.createElement('span');
        username.className = 'message-username';
        username.textContent = data.username;

        const timestamp = document.createElement('span');
        timestamp.className = 'message-time';
        timestamp.textContent = data.timestamp;

        messageHeader.appendChild(username);
        messageHeader.appendChild(timestamp);

        const messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.textContent = data.message;

        messageDiv.appendChild(messageHeader);
        messageDiv.appendChild(messageText);

        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    displaySystemMessage(message, timestamp) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'system-message';
        messageDiv.innerHTML = `${message} <small>(${timestamp})</small>`;

        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    updateUsersList(users) {
        this.usersList.innerHTML = '';
        this.usersCount.textContent = users.length;

        users.forEach(user => {
            const userItem = document.createElement('div');
            userItem.className = 'user-item';
            userItem.innerHTML = `
                <i class="fas fa-circle"></i>
                <span>${user.username}</span>
                ${user.username === this.currentUser ? '<small>(You)</small>' : ''}
            `;
            this.usersList.appendChild(userItem);
        });
    }

    handleTyping() {
        if (!this.isTyping) {
            this.isTyping = true;
            this.socket.emit('typing', { isTyping: true });
        }

        clearTimeout(this.typingTimeout);
        this.typingTimeout = setTimeout(() => {
            this.isTyping = false;
            this.socket.emit('typing', { isTyping: false });
        }, 1000);
    }

    showTypingIndicator(username, isTyping) {
        if (isTyping) {
            this.typingIndicator.innerHTML = `
                <i class="fas fa-circle typing-dots"></i>
                ${username} is typing...
            `;
            this.typingIndicator.classList.remove('hidden');
        } else {
            this.typingIndicator.classList.add('hidden');
        }
        this.scrollToBottom();
    }

    showNotification(message, type = 'success') {
        this.notificationText.textContent = message;
        this.notification.className = `notification ${type}`;
        this.notification.classList.remove('hidden');

        setTimeout(() => {
            this.notification.classList.add('hidden');
        }, 3000);
    }

    playNotificationSound() {
        // Create a simple notification sound
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }

    scrollToBottom() {
        setTimeout(() => {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }, 100);
    }
}

// Initialize the chat application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ChatApp();
});
EOF

# Create README.md
cat > README.md << 'EOF'
# Real-time Chat Application

A modern, real-time chat application built with Express.js, Socket.io, and responsive HTML/CSS.

## Features

- ✅ Real-time messaging with Socket.io
- ✅ Multiple chat rooms support
- ✅ User authentication (username selection)
- ✅ Active users list
- ✅ Typing indicators
- ✅ Message notifications
- ✅ Responsive design
- ✅ Modern UI with animations
- ✅ System messages for user join/leave
- ✅ Message timestamps
- ✅ Sound notifications

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd realtime-chat-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   
   Or for production:
   ```bash
   npm start
   ```

4. Open your browser and go to `http://localhost:3000`

## Usage

1. Enter your username (2-20 characters)
2. Optionally specify a room name (defaults to 'general')
3. Click "Join Chat" to enter the chat room
4. Start messaging with other users in real-time!

## Features in Detail