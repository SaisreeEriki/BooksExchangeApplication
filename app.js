const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const exchangeRoutes = require('./routes/bookExchangeRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const cors = require('cors');
// const bookRoutes = require('./routes/bookRoutes');
// const requestRoutes = require('./routes/requestRoutes');
// const notificationRoutes = require('./routes/notificationRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3001', // Replace with your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

// Define routes
app.use('/api/BookApplication/userService', userRoutes);
app.use('/api/BookApplication/BookService', bookRoutes);
app.use('/api/BookApplication/ExchangeService', exchangeRoutes);
app.use('/api/BookApplication/NotificationService', notificationRoutes);
// app.use('/api/BookApplication', roleRoutes);
// app.use('/api/books', bookRoutes);
// app.use('/api/requests', requestRoutes);
// app.use('/api/notifications', notificationRoutes);

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});
