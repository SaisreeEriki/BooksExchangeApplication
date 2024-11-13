const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messagesController');

// Route to fetch all messages for a specific user
router.get('/:userId', messageController.getMessages);

// Route to create a new message
router.post('/', messageController.createMessage);

module.exports = router;
