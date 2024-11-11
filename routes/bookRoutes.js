const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/', bookController.getAllBooks);  // Get all books
router.post('/', bookController.addBook);  // Add a new book

module.exports = router;
