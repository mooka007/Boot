const express = require("express");
const bodyParser = require("body-parser");
const Post = require("./server/Models/post");
const postsRouter = require("./server/routes/post");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Initialize database table
Post.createPostsTable();

// Routes
app.use("/posts", postsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
