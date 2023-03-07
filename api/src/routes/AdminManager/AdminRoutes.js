const Router = require('express');
const router = Router();
const { getAdmins, getAdminById, changeOnlineStatus } = require('./AdminController');
const { check } = require('express-validator');
const { emailVerify, idVerify } = require('../../helpers/DBValidators');
const { validateFields } = require('../../helpers/FieldValidators');
const { JWTVerify } = require('../../helpers/JWTGenerator');

//hago un get admin comprobando que tenga token para poder acceder
router.get('/', getAdmins);

router.get('/:id',[
    check('id').custom(idVerify),
    validateFields
], getAdminById);

router.put('/:id', changeOnlineStatus);

module.exports = router;
