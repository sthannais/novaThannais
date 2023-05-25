const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('tiposDescuentoRut', {
        descuento5kg: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        descuento11kg: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        descuento15kg: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        descuento45kg: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
    }, {
        timestamps: false
    });
}