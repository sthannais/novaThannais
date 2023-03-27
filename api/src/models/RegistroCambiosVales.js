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
        vale5kgFisicoAnterior : {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        vale5kgFisicoActual : {
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
        vale11kgFisicoAnterior : {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        vale11kgFisicoActual : {
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
        vale15kgFisicoAnterior : {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        vale15kgFisicoActual : {
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
        vale45kgFisicoAnterior : {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        vale45kgFisicoActual : {
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
        vale5kgDigitalAnterior : {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        vale5kgDigitalActual : {
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
        vale11kgDigitalAnterior : {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        vale11kgDigitalActual : {
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
        vale15kgDigitalAnterior : {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        vale15kgDigitalActual : {
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
        vale45kgDigitalAnterior : {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        vale45kgDigitalActual : {
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