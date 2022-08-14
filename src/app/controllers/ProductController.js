const Product = require('../models/Product.model');
const Description = require('../models/Description.model');
const ProductType = require('../models/ProductType.model');
const Manufacturer = require('../models/Manufacturer.model');

class ProductController {
    //  [GET] /api/product/get-all
    getAll(req, res, next) {
        // Product.find({})
        //     .populate({ path: 'manufacturerId', select: '-__v -_id' })
        //     .populate({ path: 'productTypeId', select: '-__v -_id' })
        //     .select('-__v -description')
        //     .then((product) => {
        //         res.send(product);
        //     })
        //     .catch((error) => res.send(error));

        Product.aggregate([
            {
                $lookup: {
                    from: 'descriptions',
                    localField: '_id',
                    foreignField: 'refId',
                    as: 'description',
                },
            },
        ]).exec(function (error, product) {
            Product.populate(product, {
                path: 'manufacturerId productTypeId',
                select: '-__v -_id',
            })
                .then((p) => res.status(200).send(p))
                .catch((error) => res.status(401).send(error));
        });
        // .populate({ path: 'manufacturerId', select: '-__v -_id' })
        // .populate({ path: 'productTypeId', select: '-__v -_id' })
        // .select('-__v -description')
        // .then((product) => {
        //     res.send(product);
        // })
        // .catch((error) => res.send(error));
    }

    //  [GET] /api/product/get-product-by-id
    async getProductById(req, res, next) {
        const param = req.query?.productId;
        if (!param) {
            res.status(401).send('Khong co hoac thieu tham so (productId)');
        } else {
            const count = await Product.countDocuments({
                productId: param,
            }).exec();
            if (count) {
                Product.find({ productId: param })
                    .populate({ path: 'manufacturerId', select: '-__v -_id' })
                    .populate({ path: 'productTypeId', select: '-__v -_id' })
                    .select('-__v')
                    .then((product) => {
                        res.status(200).send(product);
                    })
                    .catch((error) => res.send(error));
            } else {
                res.status(401).send('Khong co ma san pham nay');
            }
        }
    }

    //  [GET] /api/product/get-product-by-manufacturer
    getProductByManufacturer(req, res, next) {
        const param = req.query?.manufacturerId;
        if (!param)
            res.status(401).send(
                'Thieu param hoac ten param sai(manufacturerId)'
            );
        else {
            Manufacturer.countDocuments({ manufacturerId: param })
                .then((count) => {
                    if (count > 0) {
                        Product.find({})
                            .populate({
                                path: 'manufacturerId',
                                select: '-__v -_id',
                                match: {
                                    manufacturerId: param,
                                },
                            })
                            .populate({
                                path: 'productTypeId',
                                select: '-__v -_id',
                            })
                            .select('-__v -description')
                            .then((product) => {
                                const data = product.filter(
                                    (value) => value.manufacturerId != null
                                );
                                res.status(200).send(data);
                            })
                            .catch((error) => res.send(error));
                    } else {
                        res.status(401).send(
                            'Khong tim thay ma nha san xuat nay'
                        );
                    }
                })
                .catch((error) => res.status(401).send(error));
        }
    }

    //  [GET] /api/product/get-product-by-type
    getProductByType(req, res, next) {
        const param = req.query?.productTypeId;
        if (!param) {
            res.status(401).send(
                'Thieu param hoac ten param sai(productTypeId)'
            );
        } else {
            ProductType.countDocuments({ productTypeId: param })
                .then((count) => {
                    if (count > 0) {
                        Product.find({})
                            .populate({
                                path: 'manufacturerId',
                                select: '-__v -_id',
                            })
                            .populate({
                                path: 'productTypeId',
                                select: '-__v -_id',
                                match: { productTypeId: param },
                            })
                            .select('-__v -description')
                            .then((product) => {
                                const data = product.filter(
                                    (value) => value.productTypeId != null
                                );
                                res.status(200).send(data);
                            })
                            .catch((error) => res.send(error));
                    } else {
                        res.status(401).send(
                            'Khong tim thay ma loai san pham nay'
                        );
                    }
                })
                .catch((error) => {
                    res.status(401).send(error);
                });
        }
    }

    // [POST] /api/product/create
    create(req, res, next) {
        const data = req.body;
        if (JSON.stringify(data) === '{}') {
            res.status(401).send('Data rong');
        } else {
            const product = new Product(data);
            product
                .save()
                .then(() => {
                    res.status(200).send('Them product thanh cong');
                })
                .catch((error) => {
                    res.status(401).send(error);
                });
        }
    }
}

module.exports = new ProductController();
