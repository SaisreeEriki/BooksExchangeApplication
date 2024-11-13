const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Ensure you are using the correct Sequelize instance

const BookExchange = sequelize.define('BookExchange', {
    exchangeId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    bookId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    fromUserId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    toUserId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    exchangeDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending', // Can be 'pending', 'completed', 'canceled', etc.
    },
}, {
    tableName: 'book_exchanges', // Ensure the table name matches the one in the database
    timestamps: false, // Assuming you don't have automatic timestamps like createdAt/updatedAt
});

module.exports = BookExchange;
