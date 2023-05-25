const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('valesDigiRegalados',{
        digital5kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        totalDigital5kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        digital11kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        totalDigital11kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        digital15kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        totalDigital15kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        digital45kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        totalDigital45kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        totalValesDigitales : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
    })
}