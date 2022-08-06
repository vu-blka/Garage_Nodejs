const express = require('express');
const router = express.Router();
const serviceType = require('../app/controllers/ServiceTypeController');

router.get('/get-all', serviceType.getAll);
router.post('/create', serviceType.create);

module.exports = router;
