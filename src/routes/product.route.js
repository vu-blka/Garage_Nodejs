const express = require('express');
const app = express();
const router = express.Router();
const productController = require('../app/controllers/ProductController');

router.get('/', productController.getAll);
router.post('/create', productController.create);

// router.get('/:id', (req, res, next) => res.send('Lay 1 item co id = ' + req.params.id))
// router.put('/edit/:id', (req, res, next) => res.send('Edit item ' + req.params.id))
// router.delete('/delete/:id', (req, res, next) => res.send('Delete item ' + req.params.id))

module.exports = router;
