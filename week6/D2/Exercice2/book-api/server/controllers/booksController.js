const Book = require("../models/book");

async function getAllBooks(req, res) {
  try {
    const books = await Book.getAllBooks();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getBookById(req, res) {
  const { id } = req.params;
  try {
    const book = await Book.getBookById(id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function createBook(req, res) {
  const { title, author, publishedYear } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: "Title and author are required" });
  }
  try {
    const newBook = await Book.createBook(title, author, publishedYear);
    res.status(201).json(newBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
};
