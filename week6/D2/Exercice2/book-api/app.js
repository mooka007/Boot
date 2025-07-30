const express = require("express");
const bodyParser = require("body-parser");
const Book = require("./models/book");
const booksRouter = require("./routes/books");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

Book.createBooksTable();

app.use("/api/books", booksRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
