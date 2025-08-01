const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const Parser = require('rss-parser');
const parser = new Parser();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Global variable to store RSS feed data
let feedData = null;

// Function to fetch and parse RSS feed
async function fetchRSSFeed() {
    try {
        const feed = await parser.parseURL('https://thefactfile.org/feed/');
        return feed;
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
        return null;
    }
}

// Routes
app.get('/', async (req, res) => {
    try {
        if (!feedData) {
            feedData = await fetchRSSFeed();
        }
        res.render('pages/index', { feed: feedData });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/search', (req, res) => {
    res.render('pages/search', { feed: null, searchResults: null });
});

app.post('/search/title', async (req, res) => {
    try {
        if (!feedData) {
            feedData = await fetchRSSFeed();
        }
        
        const searchTerm = req.body.title.toLowerCase();
        const searchResults = feedData.items.filter(item => 
            item.title.toLowerCase().includes(searchTerm)
        );
        
        res.render('pages/search', { feed: feedData, searchResults });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/search/category', async (req, res) => {
    try {
        if (!feedData) {
            feedData = await fetchRSSFeed();
        }
        
        const category = req.body.category;
        const searchResults = feedData.items.filter(item => 
            item.categories && item.categories.includes(category)
        );
        
        res.render('pages/search', { feed: feedData, searchResults });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Start server
app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    // Pre-fetch the RSS feed when server starts
    feedData = await fetchRSSFeed();
});
