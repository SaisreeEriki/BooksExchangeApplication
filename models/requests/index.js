const BookExchange = require('./BookExchange');
const RequestsLog = require('./RequestsLog');

// Define associations (if needed)
// Example: RequestsLog can belong to BookExchange (one-to-many relationship)
BookExchange.hasMany(RequestsLog, { foreignKey: 'exchangeId' });
RequestsLog.belongsTo(BookExchange, { foreignKey: 'exchangeId' });

module.exports = { BookExchange, RequestsLog };
