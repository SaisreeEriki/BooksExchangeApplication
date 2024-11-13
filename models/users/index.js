// models/index.js
const User = require('./User');
const Role = require('./Role');
const UserPreferences = require('./UserPreference');

// Define associations here if not defined in models
User.belongsTo(Role, { foreignKey: 'roleId' });
User.hasOne(UserPreferences, { foreignKey: 'userId' });
UserPreferences.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, Role, UserPreferences };
