// models/BookRequests.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const BookDetails = require('./Book'); // Import BookDetails for association

const BookRequests = sequelize.define('BookRequests', {
    requestId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        field: 'request_id'
    },
    bookId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'book_details',
            key: 'book_id'
        },
        field: 'book_id'
    },
    requesterId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'requester_id'
    },
    requestDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'request_date'
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending'
    }
});

// Define relationship
BookRequests.belongsTo(BookDetails, { foreignKey: 'bookId' });

module.exports = BookRequests;
