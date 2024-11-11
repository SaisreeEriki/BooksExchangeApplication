const { poolRequests } = require('../config/db');

// Fetch all requests
const getAllRequests = async (req, res) => {
    try {
        const result = await poolRequests.query('SELECT * FROM book_exchanges');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching requests:', err);
        res.status(500).json({ error: 'Failed to fetch requests' });
    }
};

// Create a new request
const createRequest = async (req, res) => {
    const { book_id, from_user_id, to_user_id, status } = req.body;
    try {
        const result = await poolRequests.query(
            'INSERT INTO book_exchanges (book_id, from_user_id, to_user_id, status) VALUES ($1, $2, $3, $4) RETURNING *',
            [book_id, from_user_id, to_user_id, status || 'pending']
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error creating request:', err);
        res.status(500).json({ error: 'Failed to create request' });
    }
};

module.exports = { getAllRequests, createRequest };
