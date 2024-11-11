const { poolBooks } = require('../config/db');

// Fetch all books
const getAllBooks = async (req, res) => {
    try {
        const result = await poolBooks.query('SELECT * FROM book_details');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).json({ error: 'Failed to fetch books' });
    }
};

// Add a new book
const addBook = async (req, res) => {
    const { title, author, genre, description } = req.body;
    try {
        const result = await poolBooks.query(
            'INSERT INTO book_details (title, author, genre, description) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, author, genre, description]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error adding book:', err);
        res.status(500).json({ error: 'Failed to add book' });
    }
};

module.exports = { getAllBooks, addBook };
