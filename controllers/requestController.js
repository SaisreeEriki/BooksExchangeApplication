const { BookExchange, RequestsLog } = require('../models/requests');

// Fetch all book exchanges
const getAllExchanges = async (req, res) => {
    try {
        const exchanges = await BookExchange.findAll();
        res.json(exchanges);
    } catch (err) {
        console.error('Error fetching exchanges: ', err);
        res.status(500).json({ error: 'Failed to fetch exchanges' });
    }
};

// Create a new book exchange
const createExchange = async (req, res) => {
    try {
        const { bookId, fromUserId, toUserId, status } = req.body;
        const exchange = await BookExchange.create({ bookId, fromUserId, toUserId, status });
        res.status(201).json(exchange);
    } catch (err) {
        console.error('Error creating exchange: ', err);
        res.status(500).json({ error: 'Failed to create exchange' });
    }
};

// Add log to a book exchange
const addExchangeLog = async (req, res) => {
    try {
        const { exchangeId, logMessage } = req.body;
        const log = await RequestsLog.create({ exchangeId, logMessage });
        res.status(201).json(log);
    } catch (err) {
        console.error('Error adding log: ', err);
        res.status(500).json({ error: 'Failed to add log' });
    }
};

// Update exchange status
const updateExchangeStatus = async (req, res) => {
    try {
        const exchange = await BookExchange.findByPk(req.params.exchangeId);
        if (exchange) {
            const { status } = req.body;
            await exchange.update({ status });
            res.json(exchange);
        } else {
            res.status(404).json({ error: 'Exchange not found' });
        }
    } catch (err) {
        console.error('Error updating exchange: ', err);
        res.status(500).json({ error: 'Failed to update exchange' });
    }
};

// Delete exchange
const deleteExchange = async (req, res) => {
    try {
        const exchange = await BookExchange.findByPk(req.params.exchangeId);
        if (exchange) {
            await exchange.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Exchange not found' });
        }
    } catch (err) {
        console.error('Error deleting exchange: ', err);
        res.status(500).json({ error: 'Failed to delete exchange' });
    }
};

module.exports = { getAllExchanges, createExchange, addExchangeLog, updateExchangeStatus, deleteExchange };
