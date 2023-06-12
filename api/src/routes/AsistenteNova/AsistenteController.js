const { Preguntas, Respuestas } = require("../../db");
const { Op } = require("sequelize");

const getAsistente = async (req, res) => {
  const { name } = req.params;
  console.log("req", name);
  const pregunta = await Preguntas.findOne({
    include: {
      model: Respuestas,
    },
    where: {
      preguntas: {
        [Op.like]: `%${name}%`,
      },
    },
  });

  console.log("pregunta", pregunta);

  res.json(pregunta);
};

const getQuestionAsistente = async (req, res) => {
  const { id } = req.params;
  const pregunta = await Preguntas.findOne({
    where: {
      id,
    },
    include: {
      model: Respuestas,
    },
  });

  res.json(pregunta);
};

module.exports = {
  getAsistente,
  getQuestionAsistente,
};
