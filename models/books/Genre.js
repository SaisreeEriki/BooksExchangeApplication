const { DataTypes } = require('sequelize');
const { sequelizeBooks } = require('../../config/db');  

const Genre = sequelizeBooks.define('Genre', {
    genreId: {
        type: DataTypes.UUID,  // Assuming you want a UUID for the primary key
        primaryKey: true,      // Mark this as the primary key
        defaultValue: DataTypes.UUIDV4, // Automatically generate UUID
        allowNull: false,      // Ensure it can't be null
        field: 'genre_id'      // Column name in the database
    },
    genreName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'genre_name'
    }
}, {
    tableName: 'genres',
    timestamps: false
});

module.exports = Genre;
