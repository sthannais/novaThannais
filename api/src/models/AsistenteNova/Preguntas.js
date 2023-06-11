const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("preguntas", {
    preguntas: {
      type: DataTypes.STRING,
    },
    servicio: {
      type: DataTypes.STRING,
    },
  });
};
