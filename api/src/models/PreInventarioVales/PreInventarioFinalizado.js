const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('preInventarioFinalizado',{
        finalizado : {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },{
        timestamps : false
    })
}