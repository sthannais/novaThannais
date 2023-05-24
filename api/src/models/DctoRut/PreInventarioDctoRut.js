const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('preInventarioDctoRut',{
        fecha : {
            type: DataTypes.DATEONLY,
        },
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
        active : {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        comentario : {
            type: DataTypes.STRING(500),
            defaultValue: ''
        }
    },{
        timestamps : false
    })
}