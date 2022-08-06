const Product = require('../models/Product.model');

class ProductController {
    //  [GET] /api/product/
    getAll(req, res, next) {
        Product.find({})
            .then((product) => {
                res.send(product);
            })
            .catch((err) => res.send(error));
    }

    // [POST] /api/product/create
    create(req, res, next) {
        const product = new Product(req.body);
        product
            .save()
            .then(() => {
                res.send('Them thanh cong');
            })
            .catch((err) => res.send(error));
    }
}

module.exports = new ProductController();
