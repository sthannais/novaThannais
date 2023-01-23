const Router = require('express');
const router = Router();
const { getPatentes } = require('./PatenteController');

router.get('/', getPatentes);

module.exports = router;