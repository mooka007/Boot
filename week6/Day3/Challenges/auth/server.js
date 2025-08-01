const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const usersRouter = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/users', usersRouter);

// Login route
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const usersData = await fs.readFile('users.json', 'utf8');
        const users = JSON.parse(usersData);
        
        const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(401).json({ error: 'User not registered' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.json({ 
            message: 'Login successful', 
            username: user.username,
            name: user.name,
            lastName: user.lastName
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Register route
app.post('/register', async (req, res) => {
    try {
        const { name, lastName, email, username, password } = req.body;
        
        if (!name || !lastName || !email || !username || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const usersData = await fs.readFile('users.json', 'utf8');
        const users = JSON.parse(usersData);
        
        const usernameExists = users.some(u => u.username === username);
        const emailExists = users.some(u => u.email === email);
        
        if (usernameExists || emailExists) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
            name,
            lastName,
            email,
            username,
            password: hashedPassword,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        await fs.writeFile('users.json', JSON.stringify(users, null, 2));

        res.status(201).json({ 
            message: 'User registered successfully',
            username: newUser.username
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Serve HTML files
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// Initialize users.json file if it doesn't exist
async function initializeUsersFile() {
    try {
        await fs.access('users.json');
    } catch (err) {
        if (err.code === 'ENOENT') {
            await fs.writeFile('users.json', '[]');
        } else {
            throw err;
        }
    }
}

// Start server
initializeUsersFile()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to initialize users file:', err);
        process.exit(1);
    });
