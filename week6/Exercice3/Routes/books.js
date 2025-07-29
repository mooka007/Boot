const express = require("express");
const router = express.Router();

let books = [];
let currentId = 1;

router.get("/", (req, res) => {
  res.json(books);
});

router.post("/", (req, res) => {
  const { title, author, publishedYear } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: "Title and author are required" });
  }

  const newBook = {
    id: currentId++,
    title,
    author,
    publishedYear: publishedYear || null,
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author, publishedYear } = req.body;

  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  if (title !== undefined) books[bookIndex].title = title;
  if (author !== undefined) books[bookIndex].author = author;
  if (publishedYear !== undefined)
    books[bookIndex].publishedYear = publishedYear;

  res.json(books[bookIndex]);
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = books.length;

  books = books.filter((book) => book.id !== id);

  if (books.length === initialLength) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.status(204).end();
});

module.exports = router;
