const express = require('express');
const router = express.Router();
const saleDescription = require('../app/controllers/SaleDescriptionController');

router.get('/get-all', saleDescription.getAll);
router.post('/create', saleDescription.create);

module.exports = router;
