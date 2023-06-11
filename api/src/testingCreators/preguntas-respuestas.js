const { Preguntas, Respuestas } = require("../db");

const createPreguntasYRespuestas = async () => {
  const pregunta1 = await Preguntas.create({
    preguntas: "Dame la lista de personal de nova",
    servicio: "db_nova",
  });
  const respuesta1 = await Respuestas.create({
    respuestas: "La lista de personal de nova es la siguiente: ",
    descripcion: "es una lista de personal de nova",
  });
  pregunta1.addRespuestas(respuesta1);
  const pregunta2 = await Preguntas.create({
    preguntas: "¿cuanto vendimos hoy?",
    servicio: "db_nova",
  });
  const respuesta2 = await Respuestas.create({
    respuestas: "Vendimos 1000 pesos",
    descripcion: "es la venta de hoy",
  });
  pregunta2.addRespuestas(respuesta2);
  const pregunta3 = await Preguntas.create({
    preguntas: "¿cuanto vendimos ayer?",
    servicio: "db_nova",
  });
  const respuesta3 = await Respuestas.create({
    respuestas: "Vendimos 2000 pesos",
    descripcion: "es la venta de ayer",
  });
  pregunta3.addRespuestas(respuesta3);
  const pregunta4 = await Preguntas.create({
    preguntas: "¿cuanto vendimos esta semana?",
    servicio: "db_nova",
  });
  const respuesta4 = await Respuestas.create({
    respuestas: "Vendimos 3000 pesos",
    descripcion: "es la venta de esta semana",
  });
  pregunta4.addRespuestas(respuesta4);
};

module.exports = createPreguntasYRespuestas;
