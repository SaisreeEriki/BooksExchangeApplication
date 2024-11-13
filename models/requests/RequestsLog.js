const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Ensure you are using the correct Sequelize instance

const RequestsLog = sequelize.define('RequestsLog', {
    logId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    exchangeId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    logMessage: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'requests_log', // Ensure the table name matches the one in the database
    timestamps: false, // Assuming you don't have automatic timestamps like createdAt/updatedAt
});

module.exports = RequestsLog;
