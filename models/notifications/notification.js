const { DataTypes } = require('sequelize');
const { sequelizeNotifications } = require('../../config/db');

const Notification = sequelizeNotifications.define('Notification', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        field: 'id'
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id'
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'type'
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'content'
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_read'
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
    tableName: 'notifications',
    timestamps: true, // Includes createdAt and updatedAt
});

module.exports = Notification;
