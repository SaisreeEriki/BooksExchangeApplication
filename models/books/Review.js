// models/Review.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const BookDetails = require('./Book'); // Import BookDetails for association

const Review = sequelize.define('Review', {
    reviewId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        field: 'review_id'
    },
    bookId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'book_details',
            key: 'book_id'
        },
        field: 'book_id'
    },
    reviewerId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'reviewer_id'
    },
    reviewText: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'review_text'
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    reviewDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'review_date'
    }
});

// Define relationship
Review.belongsTo(BookDetails, { foreignKey: 'bookId' });

module.exports = Review;
