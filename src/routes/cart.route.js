const express = require('express');
const router = express.Router();
const cartController = require('../app/controllers/CartController');

//GET
router.get('/get-all', cartController.getAll);
router.get('/get-cart-by-id', cartController.getById);

// POST
router.post('/create', cartController.create);

// PATCH
router.patch('/update/:id', cartController.update);
router.patch('/updateStatus/', cartController.updateStatus);

// DELETE
router.delete('/delete/:id', cartController.delete);

module.exports = router;
