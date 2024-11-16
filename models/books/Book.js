const { DataTypes } = require('sequelize');
const { sequelizeBooks } = require('../../config/db'); // Correct import for the books DB
const Genre = require('./Genre'); // Import Genre model for association

const BookDetails = sequelizeBooks.define('BookDetails', {
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
    genreId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'genres', // Ensure this is referencing the correct table name
            key: 'genre_id'
        },
        field: 'genre_id'
    }
}, {
    tableName: 'book_details', // Explicitly define the table name
    timestamps: true // Include timestamps (createdAt, updatedAt) if you have them in your DB schema
});

// Define relationship
BookDetails.belongsTo(Genre, { foreignKey: 'genreId' });

module.exports = BookDetails;
