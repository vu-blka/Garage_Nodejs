const ProductType = require('../models/ProductType.model');

class ProductTypeController {
    //  [GET] /api/productType/get-all
    getAll(req, res, next) {
        ProductType.find({})
            .then((productType) => res.status(200).send(productType))
            .catch((error) => res.status(401).send(error));
    }

    // [POST] /api/productType/create
    create(req, res, next) {
        if (JSON.stringify(req.body) === '{}') res.status(400).send('Missing data');
        else {
            const productType = new ProductType(req.body);
            productType
                .save()
                .then(() => {
                    res.status(200).send(productType);
                })
                .catch((error) => res.status(400).send());
        }
    }
}

module.exports = new ProductTypeController();
