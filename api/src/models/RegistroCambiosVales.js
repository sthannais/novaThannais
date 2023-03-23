const sequelize = require('sequelize');
const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('registroCambiosVales',{
        fecha : {
            type: DataTypes.DATEONLY
        },
        hora : {
            type: DataTypes.TIME
        },
        vale5kgFisico : {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        diferencia5kgFisico : {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        comentario5kgFisico : {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        vale11kgFisico : {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        diferencia11kgFisico : {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        comentario11kgFisico : {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        vale15kgFisico : {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        diferencia15kgFisico : {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        comentario15kgFisico : {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        vale45kgFisico : {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        diferencia45kgFisico : {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        comentario45kgFisico : {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        vale5kgDigital : {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        diferencia5kgDigital : {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        comentario5kgDigital : {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        vale11kgDigital : {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        diferencia11kgDigital : {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        comentario11kgDigital : {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        vale15kgDigital : {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        diferencia15kgDigital : {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        comentario15kgDigital : {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        vale45kgDigital : {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        diferencia45kgDigital : {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        comentario45kgDigital : {
            type: DataTypes.STRING,
            defaultValue: ''
        },
    },{
        timestamps: false
    });
}