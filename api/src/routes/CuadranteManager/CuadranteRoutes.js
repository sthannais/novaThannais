const Router = require('express');
const router = Router();
const { getCuadrantes } = require('./CuadranteController');

router.get('/', getCuadrantes);

module.exports = router;