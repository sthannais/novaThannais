const sequelize = require('sequelize');
const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('efectivo',{
        billetede1 : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        totalBilletes1 : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        billetesDe2 : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        totalBilletes2 : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        billetesDe5 : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        totalBilletes5 : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        billetesDe10 : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        totalBilletes10 : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        billetesDe20 : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        totalBilletes20 : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        moneda500 : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        totalMoneda500 : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        moneda100 : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        totalMoneda100 : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        moneda50 : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        totalMoneda50 : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        moneda10 : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        totalMoneda10 : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        totalGeneral : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
    },{
        timestamps : false
    })
}