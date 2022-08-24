const express = require('express');
const router = express.Router();
const serviceController = require('../app/controllers/ServiceController');

// GET
router.get('/get-all', serviceController.getAll);
router.get('/get-service-by-id', serviceController.getServiceById);
router.get('/get-service-by-type', serviceController.getServiceByType);

// POST
router.post('/create', serviceController.create);

// DELETE
router.delete('/delete/:id', serviceController.delete);

// PATCH
router.patch('/update', serviceController.update);

module.exports = router;
