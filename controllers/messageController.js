const { Message } = require('../models/messages');

// Fetch all messages between users
const getMessages = async (req, res) => {
    try {
        const messages = await Message.findAll({
            where: {
                [Op.or]: [
                    { senderId: req.params.userId },
                    { receiverId: req.params.userId }
                ]
            }
        });
        res.json(messages);
    } catch (err) {
        console.error('Error fetching messages: ', err);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};

// Create a new message
const createMessage = async (req, res) => {
    try {
        const { senderId, receiverId, messageText, status } = req.body;
        const message = await Message.create({ senderId, receiverId, messageText, status });
        res.status(201).json(message);
    } catch (err) {
        console.error('Error creating message: ', err);
        res.status(500).json({ error: 'Failed to create message' });
    }
};

module.exports = { getMessages, createMessage };
