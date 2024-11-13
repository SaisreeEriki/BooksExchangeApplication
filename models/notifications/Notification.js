const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Ensure you are using the correct Sequelize instance

const Notification = sequelize.define('Notification', {
    notificationId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'unread', // Can be 'unread', 'read', etc.
    },
}, {
    tableName: 'notifications', // Ensure the table name matches the one in the database
    timestamps: false, // Assuming you don't have automatic timestamps like createdAt/updatedAt
});

module.exports = Notification;
