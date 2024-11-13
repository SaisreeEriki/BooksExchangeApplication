// models/BookDetails.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Genre = require('./Genre'); // Import Genre model for association

const BookDetails = sequelize.define('BookDetails', {
    bookId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        field: 'book_id'
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    genre: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT,
    },
    ownerId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'owner_id'
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'available'
    },
    addedDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'added_date'
    },
    genreId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'genres',
            key: 'genre_id'
        },
        field: 'genre_id'
    }
});

// Define relationship
BookDetails.belongsTo(Genre, { foreignKey: 'genreId' });

module.exports = BookDetails;
