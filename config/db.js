const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelizeUsers = new Sequelize(
    process.env.DB_NAME_USERS,
    process.env.DB_USER_USERS,
    process.env.DB_PASSWORD_USERS,
    {
        host: process.env.DB_HOST_USERS,
        dialect: 'postgres',
        logging: false,  // Optional: Disable SQL logging for cleaner output
    }
);

const sequelizeBooks = new Sequelize(
    process.env.DB_NAME_BOOKS,
    process.env.DB_USER_BOOKS,
    process.env.DB_PASSWORD_BOOKS,
    {
        host: process.env.DB_HOST_BOOKS,
        dialect: 'postgres',
        logging: false,  // Optional: Disable SQL logging for cleaner output
    }
);

const sequelizeNotifications = new Sequelize(
    process.env.DB_NAME_NOTIFICATIONS,
    process.env.DB_USER_NOTIFICATIONS,
    process.env.DB_PASSWORD_NOTIFICATIONS,
    {
        host: process.env.DB_HOST_NOTIFICATIONS,
        dialect: 'postgres',
        logging: false,  // Optional: Disable SQL logging for cleaner output
    }
);

const sequelizeMessages = new Sequelize(
    process.env.DB_NAME_MESSAGES,
    process.env.DB_USER_MESSAGES,
    process.env.DB_PASSWORD_MESSAGES,
    {
        host: process.env.DB_HOST_MESSAGES,
        dialect: 'postgres',
        logging: false,  // Optional: Disable SQL logging for cleaner output
    }
);

const sequelizeRequests = new Sequelize(
    process.env.DB_NAME_REQUESTS,
    process.env.DB_USER_REQUESTS,
    process.env.DB_PASSWORD_REQUESTS,
    {
        host: process.env.DB_HOST_REQUESTS,
        dialect: 'postgres',
        logging: false,  // Optional: Disable SQL logging for cleaner output
    }
);
sequelizeUsers
    .authenticate()
    .then(() => console.log('Connected to Users database successfully'))
    .catch((error) => console.error('Error connecting to Users database:', error));

module.exports = {
    sequelizeUsers,
    sequelizeBooks,
    sequelizeRequests,
    sequelizeNotifications,
    sequelizeMessages,
};
