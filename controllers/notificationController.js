const { Notification, NotificationPreferences } = require('../models/notifications');

// Fetch all notifications
const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll();
        res.json(notifications);
    } catch (err) {
        console.error('Error fetching notifications: ', err);
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
};

// Create a new notification
const createNotification = async (req, res) => {
    try {
        const { message, status } = req.body;
        const notification = await Notification.create({ message, status });
        res.status(201).json(notification);
    } catch (err) {
        console.error('Error creating notification: ', err);
        res.status(500).json({ error: 'Failed to create notification' });
    }
};

// Update notification preferences
const updateNotificationPreferences = async (req, res) => {
    try {
        const preferences = await NotificationPreferences.findOne({ where: { userId: req.params.userId } });
        if (preferences) {
            const { emailNotifications, pushNotifications } = req.body;
            await preferences.update({ emailNotifications, pushNotifications });
            res.json(preferences);
        } else {
            res.status(404).json({ error: 'Preferences not found' });
        }
    } catch (err) {
        console.error('Error updating preferences: ', err);
        res.status(500).json({ error: 'Failed to update preferences' });
    }
};

module.exports = { getAllNotifications, createNotification, updateNotificationPreferences };
