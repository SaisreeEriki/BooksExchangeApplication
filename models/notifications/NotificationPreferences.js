const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Ensure you are using the correct Sequelize instance

const NotificationPreferences = sequelize.define('NotificationPreferences', {
    userId: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    emailNotifications: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true, // Default to true for email notifications
    },
    pushNotifications: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true, // Default to true for push notifications
    },
}, {
    tableName: 'notification_preferences', // Ensure the table name matches the one in the database
    timestamps: false, // Assuming you don't have automatic timestamps like createdAt/updatedAt
});

module.exports = NotificationPreferences;
