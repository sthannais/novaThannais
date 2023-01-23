const Router = require('express');
const router = Router();
const { getAdmins, getAdminById } = require('./AdminController');
const { check } = require('express-validator');
const { emailVerify, idVerify } = require('../../helpers/DBValidators');
const { validateFields } = require('../../helpers/FieldValidators');

router.get('/', getAdmins);

router.get('/:id',[
    check('id').custom(idVerify),
    validateFields
], getAdminById);

module.exports = router;
