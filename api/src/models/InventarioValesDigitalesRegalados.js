const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('InventarioValesDigitalesRegalados',{
        digital5kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        digital11kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        digital15kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        digital45kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        totalValesDigitales : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
    },{
        timestamps : false
    })
}