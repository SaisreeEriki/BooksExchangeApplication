// models/TransactionHistory.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelizeRequests } = require('../../config/db');

const TransactionHistory = sequelizeRequests.define('TransactionHistory', {
    transactionId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        field: 'trxn_id',
    },
    exchangeId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'exchange_requests', // Ensure this is referencing the correct table name
          key: 'exchange_id'
      },
        field: 'exchange_id',
    },
    senderId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'sender_id',
    },
    receiverId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'recipient_id',
    },
    bookId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'book_id',
    },
    status: {
        type: DataTypes.ENUM('completed', 'cancelled'),
        defaultValue: 'completed',
        field: 'transaction_status',
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'updated_at'
    },
}, {
    timestamps: true,
    tableName: 'transaction_history',
});

module.exports = TransactionHistory;
