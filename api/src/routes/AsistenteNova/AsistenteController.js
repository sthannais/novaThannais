const { Preguntas, Respuestas } = require("../../db");

const getAsistente = async (req, res) => {
  const pregunta = await Preguntas.findAll({
    include: {
      model: Respuestas,
    },
  });

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
