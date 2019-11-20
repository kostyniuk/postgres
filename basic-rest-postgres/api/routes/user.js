'use strict';

const Router = require('express-promise-router');

const router = Router();

const userController = require('../controllers/user');

router.get('/', userController.getAll);

router.get('/:id', userController.getOne);

router.put(':id', userController.changeOne);

module.exports = router;
