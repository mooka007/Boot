const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

// Get all users
router.get('/', async (req, res) => {
    try {
        const data = await fs.readFile('users.json', 'utf8');
        const users = JSON.parse(data);
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const data = await fs.readFile('users.json', 'utf8');
        const users = JSON.parse(data);
        const user = users.find(u => u.id === userId);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update user by ID
router.put('/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const updates = req.body;
        
        if (!updates || Object.keys(updates).length === 0) {
            return res.status(400).json({ error: 'No updates provided' });
        }
        
        const data = await fs.readFile('users.json', 'utf8');
        let users = JSON.parse(data);
        const userIndex = users.findIndex(u => u.id === userId);
        
        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // Don't allow updating ID or password via this route
        if (updates.id || updates.password) {
            return res.status(400).json({ error: 'Cannot update ID or password via this route' });
        }
        
        // Update user
        users[userIndex] = { ...users[userIndex], ...updates };
        await fs.writeFile('users.json', JSON.stringify(users, null, 2));
        
        res.json(users[userIndex]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
