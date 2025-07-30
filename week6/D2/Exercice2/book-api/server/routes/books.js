const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  createBook,
} = require("../controllers/booksController");

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", createBook);

module.exports = router;
