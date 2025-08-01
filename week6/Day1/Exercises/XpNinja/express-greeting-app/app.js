const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// List of available emojis
const emojis = ["😀", "🎉", "🌟", "🎈", "👋"];

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes using express.Router
const router = express.Router();

// GET / - Display form
router.get('/', (req, res) => {
    res.render('index', { emojis });
});

// POST /greet - Process form and show greeting
router.post('/greet', (req, res) => {
    const { name, emoji } = req.body;
    
    // Validation
    if (!name || name.trim() === '') {
        return res.render('index', { 
            emojis, 
            error: 'Please enter your name!' 
        });
    }
    
    if (!emoji || !emojis.includes(emoji)) {
        return res.render('index', { 
            emojis, 
            error: 'Please select a valid emoji!' 
        });
    }
    
    res.render('greeting', { 
        name: name.trim(), 
        emoji 
    });
});

// Use router
app.use('/', router);

// Start server
app.listen(PORT, () => {
    console.log(`🎉 Server running on http://localhost:${PORT}`);
});
