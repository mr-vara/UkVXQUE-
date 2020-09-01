/**
 * Product model: You can define product schema here
 */
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        title: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: true },
        category: { type: DataTypes.STRING, allowNull: true },
        image: { type: DataTypes.STRING, allowNull: true }
    };

    const options = {
    };

    return sequelize.define('Product', attributes, options);
}