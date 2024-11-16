const axios = require('axios');
const { BookDetails, Genre } = require('../models/books');

// Function to validate ownerId by checking Users DB
const validateUser = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/BookApplication/userService/users/${userId}`);
    return response.status === 200; // User exists
  } catch (err) {
    console.error('User validation failed', err);
    return false; // User not found or error occurred
  }
};

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

const getAllGenres = async (req, res) => {
    try {
      const genres = await Genre.findAll();
      res.status(200).json(genres);
    } catch (error) {
      console.error('Error fetching genres:', error);
      res.status(500).json({ error: 'Failed to fetch genres' });
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
    const { title, author, genreId, description, ownerId, status } = req.body;

    // Validate if ownerId exists in Users DB
    const isValidUser = await validateUser(ownerId);
    if (!isValidUser) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    try {
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

const getGenreById = async (req, res) => {
    try {
      const genre = await Genre.findByPk(req.params.id);
      if (genre) {
        res.status(200).json(genre);
      } else {
        res.status(404).json({ error: 'Genre not found' });
      }
    } catch (error) {
      console.error('Error fetching genre:', error);
      res.status(500).json({ error: 'Failed to fetch genre' });
    }
  };

  const createGenre = async (req, res) => {
    try {
        const { genreName } = req.body; // genreName is coming from the request body
        if (!genreName) {
            return res.status(400).json({ error: 'Genre name is required' });
        }
        const newGenre = await Genre.create({ genreName }); // Pass genreName directly to model field
        res.status(201).json(newGenre);
    } catch (error) {
        console.error('Error creating genre:', error);
        res.status(500).json({ error: 'Failed to create genre' });
    }
};

  const updateGenre = async (req, res) => {
    try {
      const { id } = req.params;
      const { genre_name } = req.body;
  
      const genre = await Genre.findByPk(id);
      if (!genre) {
        return res.status(404).json({ error: 'Genre not found' });
      }
  
      genre.genre_name = genre_name || genre.genre_name;
      await genre.save();
      res.status(200).json(genre);
    } catch (error) {
      console.error('Error updating genre:', error);
      res.status(500).json({ error: 'Failed to update genre' });
    }
  };

  const deleteGenre = async (req, res) => {
    try {
      const { id } = req.params;
  
      const genre = await Genre.findByPk(id);
      if (!genre) {
        return res.status(404).json({ error: 'Genre not found' });
      }
  
      await genre.destroy();
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting genre:', error);
      res.status(500).json({ error: 'Failed to delete genre' });
    }
  };

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook, getAllGenres, getGenreById, createGenre, updateGenre, deleteGenre };
