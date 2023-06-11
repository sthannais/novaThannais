const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("respuestas", {
    respuestas: {
      type: DataTypes.STRING,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
  });
};
