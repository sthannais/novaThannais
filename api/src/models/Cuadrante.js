const sequelize = require('sequelize');
const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('cuadrante',{
        name : {
            type: DataTypes.STRING,
            allowNull: false
        },
    },{
        timestamps : false
    })
}