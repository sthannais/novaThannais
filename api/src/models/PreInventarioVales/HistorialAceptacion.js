const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('historialAceptacion',{
        fecha : {
            type: DataTypes.DATEONLY,
        },
        hora : {
            type: DataTypes.TIME,
        },
        Responsable : {
            type: DataTypes.STRING(100),
            defaultValue: ''
        }
    },{
        timestamps : false
    })
}