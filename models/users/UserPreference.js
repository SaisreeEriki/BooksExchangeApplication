// models/UserPreferences.js
const { DataTypes } = require('sequelize');
const { sequelizeUsers } = require('../../config/db');  // Use the sequelize instance for the users DB
const User = require('./User');  // Import User model for association

const UserPreferences = sequelizeUsers.define('UserPreferences', {
    userId: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
            model: 'user_details',
            key: 'user_id'
        },
        field: 'user_id'
    },
    preferredGenre: {
        type: DataTypes.STRING,
        field: 'preferred_genre'
    },
    areaOfInterests: {
        type: DataTypes.STRING,
        field: 'area_of_interests'
    },
    isAuthor: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_author'
    },
    booksSoldCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        field: 'books_sold_count'
    },
    booksBoughtCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        field: 'books_bought_count'
    }
});

// Define association
UserPreferences.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(UserPreferences, { foreignKey: 'userId' });

module.exports = UserPreferences;
