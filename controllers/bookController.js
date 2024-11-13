const { BookDetails, Genre } = require('../models/books');

// Fetch all books
const getAllBooks = async (req, res) => {
    try {
        const books = await BookDetails.findAll({
            include: [Genre] // Includes genre details
        });
        res.json(books);
    } catch (err) {
        console.error('Error fetching books: ', err);
        res.status(500).json({ error: 'Failed to fetch books' });
    }
};

// Fetch a specific book by ID
const getBookById = async (req, res) => {
    try {
        const book = await BookDetails.findByPk(req.params.bookId, {
            include: [Genre] // Includes genre details
        });
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (err) {
        console.error('Error fetching book: ', err);
        res.status(500).json({ error: 'Failed to fetch book' });
    }
};

// Create a new book
const createBook = async (req, res) => {
    try {
        const { title, author, genreId, description, ownerId, status } = req.body;
        const book = await BookDetails.create({ title, author, genreId, description, ownerId, status });
        res.status(201).json(book);
    } catch (err) {
        console.error('Error creating book: ', err);
        res.status(500).json({ error: 'Failed to create book' });
    }
};

// Update a book
const updateBook = async (req, res) => {
    try {
        const book = await BookDetails.findByPk(req.params.bookId);
        if (book) {
            const { title, author, genreId, description, ownerId, status } = req.body;
            await book.update({ title, author, genreId, description, ownerId, status });
            res.json(book);
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (err) {
        console.error('Error updating book: ', err);
        res.status(500).json({ error: 'Failed to update book' });
    }
};

// Delete a book
const deleteBook = async (req, res) => {
    try {
        const book = await BookDetails.findByPk(req.params.bookId);
        if (book) {
            await book.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (err) {
        console.error('Error deleting book: ', err);
        res.status(500).json({ error: 'Failed to delete book' });
    }
};

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook };
