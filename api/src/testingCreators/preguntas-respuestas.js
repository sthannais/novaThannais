const { Preguntas } = require("../db");

const createPreguntas = async () => {
  await Preguntas.create({
    preguntas: "Dame la lista de personal de nova",
    columns_name: '{"name":1,"precio5kg":1,"precio45kg":1}',
    servicio: "db_nova",
    function: "inventarioDctoRuts",
  });
  await Preguntas.create({
    preguntas: "¿cuanto vendimos hoy?",
    servicio: "db_nova",
    columns_name: '{"name":1,"precio5kg":1,"precio45kg":1}',
    function: "inventarioDctoRuts",
  });

  await Preguntas.create({
    preguntas: "¿cuanto vendimos ayer?",
    columns_name: '{"name":1,"precio5kg":1,"precio45kg":1}',
    servicio: "db_nova",
    function: "inventarioDctoRuts",
  });
  await Preguntas.create({
    preguntas: "¿cuanto vendimos esta semana?",
    servicio: "db_nova",
    columns_name: '{"name":1,"precio5kg":1,"precio45kg":1}',
    function: "inventarioDctoRuts",
  });
  await Preguntas.create({
    preguntas: "¿nombre del personal?",
    servicio: "db_nova",
    columns_name: '{"name":1,"lastname":1,"email":1}',
    function: "getPersonal",
  });
};

module.exports = createPreguntas;
