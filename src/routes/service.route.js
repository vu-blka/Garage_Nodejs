const express = require('express');
const router = express.Router();
const serviceController = require('../app/controllers/ServiceController');

router.get('/get-all', serviceController.getAll);
router.get('/get-service-by-type', serviceController.getServiceByType)
router.post('/create', serviceController.createService);

module.exports = router;
