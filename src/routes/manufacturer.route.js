const express = require('express');
const router = express.Router();
const manufacturerController = require('../app/controllers/ManufacturerController');

router.get('/get-all', manufacturerController.getAll);
router.post('/create', manufacturerController.create);

module.exports = router;
