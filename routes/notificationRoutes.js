const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/notificationController');

// Routes for notifications
router.get('/notifications/user/:userId', NotificationController.getNotifications);
router.post('/notifications', NotificationController.createNotification);
router.put('/notifications/:id/read', NotificationController.markAsRead);

module.exports = router;
