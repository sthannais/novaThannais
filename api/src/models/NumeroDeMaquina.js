const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('numeroDeMaquina',{
        Numero: {
            type: DataTypes.STRING,
        },
    },{
        timestamps : false
    })
}