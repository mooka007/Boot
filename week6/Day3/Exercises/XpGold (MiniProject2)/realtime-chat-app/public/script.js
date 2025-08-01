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
