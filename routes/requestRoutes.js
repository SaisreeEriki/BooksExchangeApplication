const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

router.get('/', requestController.getAllRequests);  // Get all requests
router.post('/', requestController.createRequest);  // Create a new request

module.exports = router;
