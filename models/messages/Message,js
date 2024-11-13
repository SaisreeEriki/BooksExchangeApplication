const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Ensure you are using the correct Sequelize instance

const Message = sequelize.define('Message', {
    messageId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    senderId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    receiverId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    messageText: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    sentAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'sent', // Can be 'sent', 'delivered', 'read', etc.
    },
}, {
    tableName: 'messages', // Ensure the table name matches the one in the database
    timestamps: false, // Assuming you don't have automatic timestamps like createdAt/updatedAt
});

module.exports = Message;
