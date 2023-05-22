const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('preInventarioDigitales',{
        fecha : {
            type: DataTypes.DATEONLY,
        },
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