const express = require('express');
const app = express();
const postRoutes = require('./server/routes/postRoutes');

// Middleware
app.use(express.json());

// Routes
app.use('/posts', postRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Blog API running on port ${PORT}`);
  console.log(`Endpoints:`);
  console.log(`- GET /posts`);
  console.log(`- GET /posts/:id`);
  console.log(`- POST /posts`);
  console.log(`- PUT /posts/:id`);
  console.log(`- DELETE /posts/:id`);
});
