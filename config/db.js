const { Pool } = require('pg');
require('dotenv').config();

const poolUsers = new Pool({
    user: process.env.DB_USER_USERS,
    host: process.env.DB_HOST_USERS,
    database: process.env.DB_NAME_USERS,
    password: process.env.DB_PASSWORD_USERS,
    port: process.env.DB_PORT_USERS,
});

const poolBooks = new Pool({
    user: process.env.DB_USER_BOOKS,
    host: process.env.DB_HOST_BOOKS,
    database: process.env.DB_NAME_BOOKS,
    password: process.env.DB_PASSWORD_BOOKS,
    port: process.env.DB_PORT_BOOKS,
});

const poolNotifications = new Pool({
    user: process.env.DB_USER_NOTIFICATIONS,
    host: process.env.DB_HOST_NOTIFICATIONS,
    database: process.env.DB_NAME_NOTIFICATIONS,
    password: process.env.DB_PASSWORD_NOTIFICATIONS,
    port: process.env.DB_PORT_NOTIFICATIONS,
});

const poolMessages = new Pool({
    user: process.env.DB_USER_MESSAGES,
    host: process.env.DB_HOST_MESSAGES,
    database: process.env.DB_NAME_MESSAGES,
    password: process.env.DB_PASSWORD_MESSAGES,
    port: process.env.DB_PORT_MESSAGES,
});

const poolRequests = new Pool({
    user: process.env.DB_USER_REQUESTS,
    host: process.env.DB_HOST_REQUESTS,
    database: process.env.DB_NAME_REQUESTS,
    password: process.env.DB_PASSWORD_REQUESTS,
    port: process.env.DB_PORT_REQUESTS,
});

module.exports = {
    poolUsers,
    poolBooks,
    poolRequests,
    poolNotifications,
    poolMessages,
  };
