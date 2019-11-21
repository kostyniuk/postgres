'use strict';

const Router = require('express-promise-router');

const router = Router();

const userController = require('../controllers/user');

router.get('/', userController.getAll);

router.get('/:id', userController.getOne);

router.put('/:id', userController.changeOne);

router.post('/', userController.addOne);

router.delete('/:id', userController.deleteOne);

module.exports = router;
