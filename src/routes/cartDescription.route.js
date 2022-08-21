const express = require('express');
const router = express.Router();
const cartDescriptionController = require('../app/controllers/CartDescriptionController');

//GET
router.get('/get-all', cartDescriptionController.getAll);
router.get('/get-cartdes-by-id', cartDescriptionController.getById);

// POST
router.patch('/add', cartDescriptionController.add);

// PATCH
router.patch('/confirm', cartDescriptionController.confirm);

// DELETE
router.delete('/delete/', cartDescriptionController.delete);

module.exports = router;
