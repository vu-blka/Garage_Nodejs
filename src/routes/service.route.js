const express = require('express');
const router = express.Router();
const serviceController = require('../app/controllers/ServiceController');

router.get('/', serviceController.getAll);

module.exports = router;
