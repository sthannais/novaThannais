const sequelize = require('sequelize');
const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('chofer',{
        esPeoneta : {
            type : DataTypes.BOOLEAN,
            allowNull : false,
            defaultValue : false
        },
        activeForOrden : {
            type : DataTypes.BOOLEAN,
            defaultValue : true
        },
    },{
        timestamps : false
    })
}