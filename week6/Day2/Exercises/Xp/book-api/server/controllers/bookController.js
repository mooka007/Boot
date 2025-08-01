const Book = require('../models/Book');

// Get all books
const getAllBooks = (req, res) => {
    try {
        const books = Book.getAll();
        res.status(200).json({
            success: true,
            count: books.length,
            data: books
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// Get single book by ID
const getBookById = (req, res) => {
    try {
        const { bookId } = req.params;
        const book = Book.getById(bookId);
        
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: book
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// Create new book
const createBook = (req, res) => {
    try {
        const { title, author, publishedYear } = req.body;
        
        // Validation
        if (!title || !author || !publishedYear) {
            return res.status(400).json({
                success: false,
                message: 'Please provide title, author, and publishedYear'
            });
        }
        
        const newBook = Book.create({ title, author, publishedYear });
        
        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: newBook
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// Update book
const updateBook = (req, res) => {
    try {
        const { bookId } = req.params;
        const { title, author, publishedYear } = req.body;
        
        const updatedBook = Book.update(bookId, { title, author, publishedYear });
        
        if (!updatedBook) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: updatedBook
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// Delete book
const deleteBook = (req, res) => {
    try {
        const { bookId } = req.params;
        const deleted = Book.delete(bookId);
        
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Book deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};
