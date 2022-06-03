const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('dog_temperament', {}, {
        timestamps: false
    })
};