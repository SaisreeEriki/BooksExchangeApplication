// models/Role.js
const { DataTypes } = require('sequelize');
const { sequelizeUsers } = require('../../config/db');  // Use the sequelize instance for the users DB

const Role = sequelizeUsers.define('Role', {
    roleId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        field: 'role_id',
    },
    roleName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'role_name',
    },
    permissions: {
        type: DataTypes.JSON,  // Assuming permissions can be stored as JSON
        allowNull: true,
    },
},{
    tableName: 'roles',
    timestamps: false,
    freezeTableName: true,
});

module.exports = Role;
