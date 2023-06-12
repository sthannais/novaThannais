const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("preguntas", {
    preguntas: {
      type: DataTypes.STRING,
    },
    servicio: {
      type: DataTypes.STRING,
    },
    function: {
      type: DataTypes.STRING,
    },
    columns_name: {
      type: DataTypes.STRING,
    },
  });
};
