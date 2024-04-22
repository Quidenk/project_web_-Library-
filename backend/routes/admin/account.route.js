const express = require('express');
const router = express.Router();

const accountsController = require('../../controllers/admin/accounts.controller');
const LoginController = require('../../controllers/admin/auth.controller')

router.get('/', accountsController.findAll )
router.get('/:id', accountsController.findbyid )
router.post('/', accountsController.create)
router.put('/:id', accountsController.update)
router.delete('/', accountsController.deleteAll)
router.delete('/:id', accountsController.delete)
router.put('/borrow/:id', accountsController.updateBorrow)

router.post('/login', LoginController.login)
router.post('/adminlogin', LoginController.adminlogin)

module.exports = router;
