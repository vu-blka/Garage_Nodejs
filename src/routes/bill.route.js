const express = require('express');
const router = express.Router();
const billController = require('../app/controllers/BillController');

//GET
router.get('/get-all', billController.getAll);

// POST
router.post('/create', billController.create);

module.exports = router;
