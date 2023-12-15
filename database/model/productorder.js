const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const ProductOrder = sequelize.define('ProductOrder', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    return ProductOrder;
};
