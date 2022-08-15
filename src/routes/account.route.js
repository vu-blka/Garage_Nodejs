const express = require('express');
const router = express.Router();
const accountController = require('../app/controllers/AccountController');

//GET
router.get('/get-all', accountController.getAll);

// POST
router.post('/signin', accountController.signin);
router.post('/signup', accountController.signup);

module.exports = router;
