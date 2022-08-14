const express = require('express');
const router = express.Router();
const description = require('../app/controllers/DescriptionController');

router.get('/get-all', description.getAll);
router.post('/create', description.create);

module.exports = router;
