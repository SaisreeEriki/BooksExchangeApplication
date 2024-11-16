const { Notification } = require('../models/notifications');
const axios = require('axios'); 

// controllers/BookExchangeController.js
const BookExchange = require('../models/requests/exchangeRequest');
const TransactionHistory = require('../models/requests/transactionHistory');
const { Op } = require('sequelize'); 

// Send exchange request
async function sendExchangeRequest(req, res) {
    const { senderId, receiverId, bookId, deliveryMethod, exchangeDuration } = req.body;

    try {
        const exchangeRequest = await BookExchange.create({
            senderId,
            receiverId,
            bookId,
            deliveryMethod,
            exchangeDuration,
        });

        // Mock notification for now
        console.log(`Exchange request sent: ${exchangeRequest.exchangeId}`);

        res.status(201).json({
            message: 'Exchange request sent successfully',
            exchangeRequest,
        });
    } catch (error) {
        console.error('Error sending exchange request:', error);
        res.status(500).json({ error: 'Failed to send exchange request' });
    }
}

// Accept exchange request
async function acceptExchangeRequest(req, res) {
    const { exchangeId } = req.params;

    try {
        const exchangeRequest = await BookExchange.findByPk(exchangeId);
        if (!exchangeRequest) return res.status(404).json({ error: 'Request not found' });

        exchangeRequest.status = 'accepted';
        await exchangeRequest.save();

        // Move to transaction history
        await TransactionHistory.create({
            exchangeId: exchangeRequest.exchangeId,
            senderId: exchangeRequest.senderId,
            receiverId: exchangeRequest.receiverId,
            bookId: exchangeRequest.bookId,
            status: 'completed',
        });

        // Mock notification for now
        console.log(`Exchange request accepted: ${exchangeRequest.exchangeId}`);

        res.status(200).json({ message: 'Exchange request accepted', exchangeRequest });
    } catch (error) {
        console.error('Error accepting exchange request:', error);
        res.status(500).json({ error: 'Failed to accept exchange request' });
    }
}

// Reject exchange request
async function rejectExchangeRequest(req, res) {
    const { exchangeId } = req.params;

    try {
        const exchangeRequest = await BookExchange.findByPk(exchangeId);
        if (!exchangeRequest) return res.status(404).json({ error: 'Request not found' });

        exchangeRequest.status = 'rejected';
        await exchangeRequest.save();

        // Mock notification for now
        console.log(`Exchange request rejected: ${exchangeRequest.exchangeId}`);

        res.status(200).json({ message: 'Exchange request rejected', exchangeRequest });
    } catch (error) {
        console.error('Error rejecting exchange request:', error);
        res.status(500).json({ error: 'Failed to reject exchange request' });
    }
}

// Modify exchange request
async function modifyExchangeRequest(req, res) {
    const { exchangeId } = req.params;
    const { deliveryMethod, exchangeDuration } = req.body;

    try {
        const exchangeRequest = await BookExchange.findByPk(exchangeId);
        if (!exchangeRequest) return res.status(404).json({ error: 'Request not found' });

        exchangeRequest.deliveryMethod = deliveryMethod || exchangeRequest.deliveryMethod;
        exchangeRequest.exchangeDuration = exchangeDuration || exchangeRequest.exchangeDuration;
        exchangeRequest.status = 'modified';
        await exchangeRequest.save();

        // Mock notification for now
        console.log(`Exchange request modified: ${exchangeRequest.exchangeId}`);

        res.status(200).json({ message: 'Exchange request modified', exchangeRequest });
    } catch (error) {
        console.error('Error modifying exchange request:', error);
        res.status(500).json({ error: 'Failed to modify exchange request' });
    }
}

const getUserExchangeRequests = async (req, res) => {
  const { userId } = req.params;

  try {
      const requests = await BookExchange.findAll({
          where: {
              [Op.or]: [{ senderId: userId }, { receiverId: userId }],
          },
          order: [['createdAt', 'DESC']],
      });

      res.status(200).json({ data: requests });
  } catch (error) {
      console.error('Error fetching user requests:', error);
      res.status(500).json({ error: 'Failed to fetch exchange requests' });
  }
};

const sendNotification = async (userId, message) => {
  try {
      // Call the Notifications microservice (assuming it's running on port 4000)
      await axios.post('http://localhost:4000/api/BookApplication/NotificationsService/send', {
          userId,
          message,
      });
  } catch (error) {
      console.error('Failed to send notification:', error);
  }
};

const updateExchangeRequestStatus1 = async (req, res) => {
  const { exchangeId } = req.params;
  const { status } = req.body;

  try {
      const exchangeRequest = await BookExchange.findOne({ where: { exchangeId } });

      if (!exchangeRequest) {
          return res.status(404).json({ message: 'Exchange request not found' });
      }

      exchangeRequest.status = status;
      await exchangeRequest.save();

      // Notify both sender and receiver
      await sendNotification(exchangeRequest.senderId, `Your request has been ${status}.`);
      await sendNotification(exchangeRequest.receiverId, `You ${status} a request.`);

      res.status(200).json({ message: 'Status updated and notifications sent', data: exchangeRequest });
  } catch (error) {
      console.error('Error updating request status:', error);
      res.status(500).json({ error: 'Failed to update request status' });
  }
};

const updateExchangeRequestStatus = async (req, res) => {
    const { requestId, status } = req.body;

    try {
        // Find the exchange request
        const exchangeRequest = await BookExchange.findByPk(requestId);
        if (!exchangeRequest) {
            return res.status(404).json({ error: 'Exchange request not found' });
        }

        // Update the status of the exchange request
        exchangeRequest.status = status;
        await exchangeRequest.save();

        // Send a notification to the sender
        const senderId = exchangeRequest.senderId;
        await axios.post('http://localhost:3000/api/BookApplication/NotificationService/notifications', {
            userId: senderId,
            type: 'exchange_request_status',
            content: `Your book exchange request has been ${status}.`,
        });

        res.status(200).json({ message: 'Exchange request status updated successfully' });
    } catch (error) {
        console.error('Error updating exchange request status:', error);
        res.status(500).json({ error: 'Failed to update exchange request status' });
    }
};

const createExchangeRequest = async (req, res) => {
    const { senderId, receiverId, bookId, status } = req.body;

    try {
        // Create the exchange request in the database
        const exchange = await BookExchange.create({ senderId, receiverId, bookId, status });

        // Trigger a notification for the receiver
        await axios.post('http://localhost:3000/api/BookApplication/NotificationService/notifications', {
            userId: receiverId,
            type: 'exchange_request',
            content: `You have a new book exchange request from user ${senderId}.`,
        });

        res.status(201).json({ data: exchange });
    } catch (error) {
        console.error('Error creating exchange request:', error);
        res.status(500).json({ error: 'Failed to create exchange request' });
    }
};

module.exports = {
    sendExchangeRequest,
    acceptExchangeRequest,
    rejectExchangeRequest,
    modifyExchangeRequest,
    updateExchangeRequestStatus,
    getUserExchangeRequests,
    createExchangeRequest,
};
