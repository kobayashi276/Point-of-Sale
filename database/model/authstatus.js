const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const AuthStatus = sequelize.define('AuthStatus', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        token: {
            type: DataTypes.TEXT('long'),
            allowNull: false,
        }
    });
    return AuthStatus;
};