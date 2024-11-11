const { poolNotifications } = require('../config/db');

// Fetch all notifications for a user
const getNotifications = async (req, res) => {
    const { userId } = req.params;
    try {
        const result = await poolNotifications.query(
            'SELECT * FROM notifications WHERE user_id = $1',
            [userId]
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching notifications:', err);
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
};

// Mark notification as read
const markAsRead = async (req, res) => {
    const { notificationId } = req.params;
    try {
        await poolNotifications.query(
            'UPDATE notifications SET status = $1 WHERE notification_id = $2',
            ['read', notificationId]
        );
        res.json({ message: 'Notification marked as read' });
    } catch (err) {
        console.error('Error marking notification as read:', err);
        res.status(500).json({ error: 'Failed to mark notification as read' });
    }
};

module.exports = { getNotifications, markAsRead };
