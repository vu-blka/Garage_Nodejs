const express = require('express');
const router = express.Router();
const cartDescriptionController = require('../app/controllers/CartDescriptionController');

//GET
router.get('/get-all', cartDescriptionController.getAll);
router.get('/get-cartdes-by-id', cartDescriptionController.getById);

// POST
//router.post('/create', cartDescriptionController.create);


module.exports = router;
