const sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('personal',{
        name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        lastname : {
            type : DataTypes.STRING,
            allowNull : false
        },
        email : {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false
        },
        rut: {
            type : DataTypes.STRING,
            allowNull : false,
        },
        stateDB : {
            type : DataTypes.BOOLEAN,
            defaultValue : true
        },
        online : {
            type : DataTypes.BOOLEAN,
            defaultValue : false
        },
    },{
        timestamps : false
    })
}