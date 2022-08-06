const express = require('express');
const router = express.Router();
const productType = require('../app/controllers/ProductTypeController');

router.get('/get-all', productType.getAll);
router.post('/create', productType.create);

module.exports = router;
