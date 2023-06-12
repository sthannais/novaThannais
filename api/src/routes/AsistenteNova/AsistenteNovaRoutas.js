const Router = require("express");
const router = Router();
const { check } = require("express-validator");
const { getAsistente, getQuestionAsistente } = require("./AsistenteController");
const { idVerify, nameVerify } = require("../../helpers/DBValidators");
const { validateFields } = require("../../helpers/FieldValidators");

router.get("/preguntas/:name", check("name").isString(), getAsistente);
router.get(
  "/preguntas/respuestas/:id",
  [check("id").custom(idVerify), validateFields],
  getQuestionAsistente
);

module.exports = router;
