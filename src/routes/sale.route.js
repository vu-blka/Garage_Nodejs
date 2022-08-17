const express = require('express');
const router = express.Router();
const sale = require('../app/controllers/SaleController');

router.get('/get-all', sale.getAll);
router.post('/create', sale.create);

module.exports = router;
