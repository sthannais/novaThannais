const sequelize = require('sequelize');
const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('ayudante',{
        activeForOrden : {
            type : DataTypes.BOOLEAN,
            defaultValue : true
        },
    },{
        timestamps : false
    })
}