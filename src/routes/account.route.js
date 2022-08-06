const express = require('express');
const router = express.Router();
const accountController = require('../app/controllers/AccountController');

router.post('/signin', accountController.signin);
router.post('/signup', accountController.signup);

module.exports = router;
