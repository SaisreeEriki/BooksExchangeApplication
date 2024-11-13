const BookDetails = require('./Book');
const BookRequests = require('./BookRequest');
const Review = require('./Review');
const Genre = require('./Genre');

// Define associations between models
BookDetails.belongsTo(Genre, { foreignKey: 'genreId' });
BookRequests.belongsTo(BookDetails, { foreignKey: 'bookId' });
Review.belongsTo(BookDetails, { foreignKey: 'bookId' });

module.exports = { BookDetails, BookRequests, Review, Genre };
