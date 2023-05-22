const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('preInventarioRegalados',{
        fecha : {
            type: DataTypes.DATEONLY,
        },
        regalados5kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        regalados11kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        regalados15kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        regalados45kg : {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        totalValesRegalados : {
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