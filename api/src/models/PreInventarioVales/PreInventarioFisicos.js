const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('preInventarioFisicos',{
        fecha : {
            type: DataTypes.DATEONLY,
        },
        fisico5kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        fisico11kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        fisico15kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        fisico45kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        totalValesFisicos : {
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
    