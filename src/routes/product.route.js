const express = require('express');
const app = express();
const router = express.Router();
const productController = require('../app/controllers/ProductController');

//GET
router.get('/get-all', productController.getAll);
router.get('/get-product-by-id', productController.getProductById);
router.get('/get-product-by-type', productController.getProductByType);
router.get(
    '/get-product-by-manufacturer',
    productController.getProductByManufacturer
);

//POST
router.post('/create', productController.create);

//DELETE
router.delete('/delete/:id', productController.delete);

//PATCH
router.patch('/update/:id', productController.update);

// router.get('/:id', (req, res, next) => res.send('Lay 1 item co id = ' + req.params.id))
// router.put('/edit/:id', (req, res, next) => res.send('Edit item ' + req.params.id))
// router.delete('/delete/:id', (req, res, next) => res.send('Delete item ' + req.params.id))

module.exports = router;
