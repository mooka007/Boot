const express = require('express');
const dotenv = require('dotenv');
const bookRoutes = require('./server/routes/bookRoutes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/books', bookRoutes);

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Book API' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📖 API endpoints available at http://localhost:${PORT}/api/books`);
});

module.exports = app;
