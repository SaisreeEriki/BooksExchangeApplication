// routes/bookExchangeRoutes.js
const express = require('express');
const router = express.Router();
const BookExchangeController = require('../controllers/bookExchangeController');

// Send exchange request
router.post('/send', BookExchangeController.sendExchangeRequest);

// Accept exchange request
router.put('/accept/:exchangeId', BookExchangeController.acceptExchangeRequest);

// Reject exchange request
router.put('/reject/:exchangeId', BookExchangeController.rejectExchangeRequest);

// Modify exchange request
router.put('/modify/:exchangeId', BookExchangeController.modifyExchangeRequest);

// router.put('/exchanges/:exchangeId/status', BookExchangeController.updateExchangeRequestStatus);
router.put('/exchanges/status', BookExchangeController.updateExchangeRequestStatus);

router.get('/exchanges/user/:userId', BookExchangeController.getUserExchangeRequests);

router.post('/exchanges', BookExchangeController.createExchangeRequest);


module.exports = router;
