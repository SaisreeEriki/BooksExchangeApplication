const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.get('/:userId', notificationController.getNotifications);  // Get notifications for a user
router.put('/:notificationId/read', notificationController.markAsRead);  // Mark notification as read

module.exports = router;
