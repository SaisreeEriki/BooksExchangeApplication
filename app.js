const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
// const bookRoutes = require('./routes/bookRoutes');
// const requestRoutes = require('./routes/requestRoutes');
// const notificationRoutes = require('./routes/notificationRoutes');

dotenv.config();

const app = express();
app.use(express.json());

// Define routes
app.use('/api/BookApplication', userRoutes);
// app.use('/api/BookApplication', roleRoutes);
// app.use('/api/books', bookRoutes);
// app.use('/api/requests', requestRoutes);
// app.use('/api/notifications', notificationRoutes);

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});
