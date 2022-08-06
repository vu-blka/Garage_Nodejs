const express = require('express');
const router = express.Router();
const roleController = require('../app/controllers/RoleController');

router.get('/', roleController.getAll);
router.post('/create', roleController.create);

module.exports = router;
