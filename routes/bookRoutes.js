const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/books', bookController.getAllBooks);
router.get('/books/:bookId', bookController.getBookById);
router.post('/books', bookController.createBook);
router.put('/books/:bookId', bookController.updateBook);
router.delete('/books/:bookId', bookController.deleteBook);

router.get('/genres', bookController.getAllGenres);
router.post('/genres', bookController.createGenre);
router.get('/genres/:genreId', bookController.getGenreById);
router.put('/genres/:genreId', bookController.updateGenre);
router.delete('/genres/:genreId', bookController.deleteGenre);

module.exports = router;
