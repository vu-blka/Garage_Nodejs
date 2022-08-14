const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');

//GET
router.get('/get-user-info', userController.getUserInfo);

//POST
router.post('/create', userController.create);

//PATCH
router.patch('/update/:id', userController.update);

module.exports = router;
