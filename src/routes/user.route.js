const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');

router.get('/get-user-info', userController.getUserInfo);


module.exports = router;
