const { Notification } = require('../models/notifications');

// Fetch all notifications for a user
const getNotifications = async (req, res) => {
    const { userId } = req.params;

    try {
        const notifications = await Notification.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']],
        });

        res.status(200).json({ data: notifications });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
};

// Create a new notification
const createNotification = async (req, res) => {
    const { userId, type, content } = req.body;

    try {
        const notification = await Notification.create({ userId, type, content });
        res.status(201).json({ data: notification });
    } catch (error) {
        console.error('Error creating notification:', error);
        res.status(500).json({ error: 'Failed to create notification' });
    }
};

// Mark a notification as read
const markAsRead = async (req, res) => {
    const { id } = req.params;

    try {
        const notification = await Notification.findByPk(id);

        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }

        notification.isRead = true;
        await notification.save();

        res.status(200).json({ data: notification });
    } catch (error) {
        console.error('Error marking notification as read:', error);
        res.status(500).json({ error: 'Failed to update notification' });
    }
};

module.exports = {
    getNotifications,
    createNotification,
    markAsRead,
};
