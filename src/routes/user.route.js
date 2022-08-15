const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');

//GET
router.get('/get-all', userController.getAll);
router.get('/get-user-info', userController.getUserInfo);

//POST
router.post('/create', userController.create);

//DELETE
router.delete('/delete/:id', userController.delete);

//PATCH
router.patch('/update/:id', userController.update);

module.exports = router;
