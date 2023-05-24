const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('historialAceptacionDctoRut',{
        fecha : {   
            type: DataTypes.DATEONLY,
        },
        hora : {
            type: DataTypes.TIME,
        },
        responsable : {
            type: DataTypes.STRING(50),
            defaultValue: ''
        },
        
    },{
        timestamps : false
    })
}
