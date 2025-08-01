const express = require('express');
const router = express.Router();
const {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
} = require('../controllers/bookController');

// @route   GET /api/books
// @desc    Get all books
// @access  Public
router.get('/', getAllBooks);

// @route   GET /api/books/:bookId
// @desc    Get single book by ID
// @access  Public
router.get('/:bookId', getBookById);

// @route   POST /api/books
// @desc    Create new book
// @access  Public
router.post('/', createBook);

// @route   PUT /api/books/:bookId
// @desc    Update book
// @access  Public
router.put('/:bookId', updateBook);

// @route   DELETE /api/books/:bookId
// @desc    Delete book
// @access  Public
router.delete('/:bookId', deleteBook);

module.exports = router;
