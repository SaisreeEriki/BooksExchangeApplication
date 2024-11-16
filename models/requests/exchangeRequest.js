// models/BookExchange.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelizeRequests } = require('../../config/db');

const BookExchange = sequelizeRequests.define('BookExchange', {
    exchangeId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
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
    deliveryMethod: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'delivery_method',
    },
    exchangeDuration: {
        type: DataTypes.INTEGER, // Duration in days
        allowNull: false,
        field: 'exchange_duration',
    },
    status: {
        type: DataTypes.ENUM('pending', 'accepted', 'rejected', 'modified'),
        defaultValue: 'pending',
        field: 'status',
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
    tableName: 'exchange_requests',
});

module.exports = BookExchange;
