const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('inventarioDctoRut',{
        dctoRut5kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        dctoRut11kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        dctoRut15kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        dctoRut45kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        totalDctoRut : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
    },{
        timestamps : false
    })
}