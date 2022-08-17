const Product = require('../models/Product.model');
const Description = require('../models/Description.model');
const ProductType = require('../models/ProductType.model');
const Manufacturer = require('../models/Manufacturer.model');

class ProductController {
  //  [GET] /api/product/get-all
  getAll(req, res, next) {
    //Product.find({})
    //    .populate({ path: 'manufacturerId', select: '-__v -_id' })
    //    .populate({ path: 'productTypeId', select: '-__v -_id' })
    //    .select('-__v -description')
    //    .then((product) => {
    //        res.send(product);
    //    })
    //    .catch((error) => res.send(error));

    Product.aggregate([
      {
        $lookup: {
          from: 'saledescriptions',
          localField: '_id',
          foreignField: 'refId',
          as: 'saledescription',
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
        // Product.find({ productId: param })
        //     .populate({ path: 'manufacturerId', select: '-__v -_id' })
        //     .populate({ path: 'productTypeId', select: '-__v -_id' })
        //     .select('-__v')
        //     .then((product) => {
        //         res.status(200).send(product);
        //     })
        //     .catch((error) => res.send(error));

        Product.aggregate([
          {
            $match: {
              productId: param,
            },
          },
          {
            $lookup: {
              from: 'descriptions',
              localField: '_id',
              foreignField: 'refId',
              as: 'description',
            },
          },
          {
            $project: {
              __v: 0,
            },
          },
          {
            $lookup: {
              from: 'saledescriptions',
              localField: '_id',
              foreignField: 'refId',
              as: 'saledescription',
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
      } else {
        res.status(401).send('Khong co ma san pham nay');
      }
    }
  }

  //  [GET] /api/product/get-product-by-manufacturer
  getProductByManufacturer(req, res, next) {
    const param = req.query?.manufacturerId;
    if (!param)
      res.status(401).send('Thieu param hoac ten param sai(manufacturerId)');
    else {
      Manufacturer.countDocuments({ manufacturerId: param })
        .then((count) => {
          if (count > 0) {
            //Product.find({})
            //  .populate({
            //    path: 'manufacturerId',
            //    select: '-__v -_id',
            //    match: {
            //      manufacturerId: param,
            //    },
            //  })
            //  .populate({
            //    path: 'productTypeId',
            //    select: '-__v -_id',
            //  })
            //  .select('-__v -description')
            //  .then((product) => {
            //    const data = product.filter(
            //      (value) => value.manufacturerId != null
            //    );
            //    res.status(200).send(data);
            //  })
            //  .catch((error) => res.send(error));
            Product.aggregate([
              {
                $lookup: {
                  from: 'saledescriptions',
                  localField: '_id',
                  foreignField: 'refId',
                  as: 'saledescription',
                },
              },
            ]).exec(function (error, product) {
              Product.populate(product, {
                path: 'manufacturerId',
                select: '-__v -_id',
                match: { manufacturerId: param },
              })
                .then((p) =>
                  res
                    .status(200)
                    .send(p.filter((value) => value.manufacturerId != null))
                )
                .catch((error) => res.status(401).send(error));
            });
          } else {
            res.status(401).send('Khong tim thay ma nha san xuat nay');
          }
        })
        .catch((error) => res.status(401).send(error));
    }
  }

  //  [GET] /api/product/get-product-by-type
  getProductByType(req, res, next) {
    const param = req.query?.productTypeId;
    if (!param) {
      res.status(401).send('Thieu param hoac ten param sai(productTypeId)');
    } else {
      ProductType.countDocuments({ productTypeId: param })
        .then((count) => {
          if (count > 0) {
            //Product.find({})
            //  .populate({
            //    path: 'manufacturerId',
            //    select: '-__v -_id',
            //  })
            //  .populate({
            //    path: 'productTypeId',
            //    select: '-__v -_id',
            //    match: { productTypeId: param },
            //  })
            //  .select('-__v -description')
            //  .then((product) => {
            //    const data = product.filter(
            //      (value) => value.productTypeId != null
            //    );
            //    res.status(200).send(data);
            //  })
            //  .catch((error) => res.send(error));
            Product.aggregate([
              {
                $lookup: {
                  from: 'saledescriptions',
                  localField: '_id',
                  foreignField: 'refId',
                  as: 'saledescription',
                },
              },
            ]).exec(function (error, product) {
              Product.populate(product, {
                path: 'productTypeId',
                select: '-__v -_id',
                match: { productTypeId: param },
              })
                .then((p) =>
                  res
                    .status(200)
                    .send(p.filter((value) => value.productTypeId != null))
                )
                .catch((error) => res.status(401).send(error));
            });
          } else {
            res.status(401).send('Khong tim thay ma loai san pham nay');
          }
        })
        .catch((error) => {
          res.status(401).send(error);
        });
    }
  }

  // [POST] /api/product/create
  create(req, res, next) {
    const data = req?.body;
    if (JSON.stringify(data) === '{}') {
      res.status(401).send('Data rong');
    } else {
      const product = new Product(data);
      product
        .save()
        .then((product) => {
          const id = product._id;
          const description = data.description;
          if (JSON.stringify(description) === '[]') {
            res
              .status(200)
              .send('Them product thanh cong (khong co description)');
          } else {
            let des;
            description.map((value) => {
              value.refId = id;
              des = new Description(value);
              des
                .save()
                .then(() => console.log('them des thanh cong'))
                .catch((error) => res.status(401).send(error));
            });
            res.status(200).send('Them product thanh cong (co description)');
          }
        })
        .catch((error) => {
          res.status(401).send(error);
        });
    }
  }

  //[DELETE] /api/product/delete/:id
  delete(req, res, next) {
    const param = req.params?.id;
    if (!param) {
      res.status(401).send('Khong co param');
    } else {
      Product.countDocuments({ productId: param })
        .then((count) => {
          if (count > 0) {
            Product.delete({ productId: param })
              .then(() => {
                res.status(200).send('Xoa san pham thanh cong');
              })
              .catch((error) => res.status(401).send('Khong xoa duoc'));
          } else {
            res
              .status(401)
              .send('Khong co san pham nay hoac san pham da bi xoa');
          }
        })
        .catch((error) => res.status(401).send(error));
    }
  }

  //[UPDATE] /api/product/update/:id
  update(req, res, next) {
    const param = req?.params?.id;
    if (!param) {
      res.status(401).send('Khong co param');
    } else {
      const body = req?.body;
      Product.countDocuments({ productId: param }).then((count) => {
        if (count > 0) {
          if (JSON.stringify(body) !== '{}') {
            Product.updateOne({ productId: param }, body)
              .then(() => {
                res.status(200).send('Sua product thanh cong');
              })
              .catch((error) => res.status(401).send(error));
          } else {
            res.status(401).send('Khong co du lieu body');
          }
        } else {
          res.status(401).send('Khong co ma san pham nay');
        }
      });
    }
  }
}

module.exports = new ProductController();
