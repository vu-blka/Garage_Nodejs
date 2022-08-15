const express = require('express');
const router = express.Router();
const statusController = require('../app/controllers/StatusController');

//GET
router.get('/get-all', statusController.getAll);

// POST
router.post('/create', statusController.create);
// router.post('/signup', statusController.signup);

module.exports = router;
