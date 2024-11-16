const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const { sequelizeUsers } = require('../../config/db');
const Role = require('./Role');

const User = sequelizeUsers.define('User', {
  userId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    field: 'user_id'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'password_hash'
  },
  contactInfo: {
    type: DataTypes.STRING,
    field: 'contact_info'
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
  lastLogin: {
    type: DataTypes.DATE,
    field: 'last_login'
  },
  roleId: {
    type: DataTypes.UUID,
    references: {
      model: 'roles',
      key: 'role_id'
    },
    field: 'role_id'
  },
  passwordResetToken: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'password_reset_token'
  },
  resetTokenExpiration: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'password_reset_expires'
  }
}, {
  tableName: 'user_details', // Ensure the table name matches your PostgreSQL schema
  hooks: {
    beforeCreate: async (user) => {
      // if (user.passwordHash) {
      //   const salt = await bcrypt.genSalt(10);
      //   user.passwordHash = await bcrypt.hash(user.passwordHash, salt);
      // }
    }
  }
});

User.belongsTo(Role, { foreignKey: 'roleId' });

module.exports = User;
