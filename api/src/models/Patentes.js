const sequelize = require('sequelize');
const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('patentes',{
        name : {
            type: DataTypes.STRING,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },{
        timestamps : false
    })
}