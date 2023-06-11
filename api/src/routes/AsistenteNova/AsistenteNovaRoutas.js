const Router = require("express");
const router = Router();
const { check } = require("express-validator");
const { getAsistente, getQuestionAsistente } = require("./AsistenteController");
const { idVerify } = require("../../helpers/DBValidators");
const { validateFields } = require("../../helpers/FieldValidators");

router.get("/preguntas", getAsistente);
router.get(
  "/preguntas/respuestas/:id",
  [check("id").custom(idVerify), validateFields],
  getQuestionAsistente
);

module.exports = router;
