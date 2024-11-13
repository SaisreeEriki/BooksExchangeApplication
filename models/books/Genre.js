// models/Genre.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Genre = sequelize.define('Genre', {
    genreId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'genre_id'
    },
    genreName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'genre_name'
    }
});

module.exports = Genre;
