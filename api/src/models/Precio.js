const sequelize = require('sequelize');
const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('precio',{
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        precio : {
            type: DataTypes.BIGINT,
        }
    },{
        timestamps : false
    })
}