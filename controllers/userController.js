const { poolUsers } = require('../config/db');

// Fetch all users
const getAllUsers = async (req, res) => {
    try {
        const result = await poolUsers.query('SELECT * FROM user_details');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching users: ', err);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

module.exports = { getAllUsers };
