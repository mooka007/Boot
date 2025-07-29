const express = require("express");
const booksRouter = require("./routes/books");

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Mount the router
app.use("/books", booksRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Book API running on http://localhost:${PORT}`);
});
