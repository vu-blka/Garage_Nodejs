const Product = require('../models/Product.model');
const Cart = require('../models/Cart.model');
const CartDescription = require('../models/CartDescription.model');

class CartDescriptionController {
  // [GET] api/cartDescription/get-all
  getAll(req, res, next) {
    CartDescription.find({})
      .populate({
        path: 'products.productId',
        select: '-__v -description',
      })
      .populate({
        path: 'services.serviceId',
        select: '-__v -description',
      })
      .populate({
        path: 'productAdd.productId',
        select: '-__v -description',
      })
      .then((cartDes) => {
        res.status(200).send(cartDes);
      })
      .catch((error) => res.status(401).send(error));
  }

  // [GET] api/cartDescription/get-cartdes-by-id
  getById(req, res, next) {
    const id = req?.query?.id;
    Cart.findOne({ cartId: id }).then((cart) => {
      if (cart) {
        CartDescription.findOne({ cartId: cart._id })
          .populate('products.productId')
          .populate('services.serviceId')
          .populate('productAdd.productId')
          .then((cartDes) => {
            res.status(200).send(cartDes);
          })
          .catch((error) => res.status(401).send(error));
      } else {
        res.status(401).send('Không tìm thấy giỏ hàng có ID này');
      }
    });
  }

  // [PATCH] api/cartDescription/add
  add(req, res, next) {
    const data = req?.body;
    if (JSON.stringify(data) === '{}') {
      res.status(401).send('Thiếu data truyền vào (body)');
    } else {
      CartDescription.findOne({ _id: data?.idCartDes }).then((cart) => {
        if (cart) {
          cart.productAdd = data?.productAdd;
          cart
            .save()
            .then(() => {
              res
                .status(200)
                .send('Thêm sản phẩm (add) vào giỏ hàng thành công');
            })
            .catch((error) => res.status(401).send(error));
        } else {
          res
            .status(401)
            .send('Không tìm thấy cart description tương ứng với ID này');
        }
      });
    }
  }

  // [PATCH] api/cartDescription/confirm
  confirm(req, res, next) {
    //const id = req.query?.id;
    const data = req?.body;
    const { id, newPrice } = data;
    if (id) {
      CartDescription.findOne({ _id: id })
        .then((cartDes) => {
          const productAdd = cartDes?.productAdd;
          productAdd.map((value) => {
            value.typeProduct = 'confirm';
            value.save();
          });
          const products = cartDes?.products;
          products.push(...productAdd);
          CartDescription.updateOne(
            { _id: id },
            { products: products, productAdd: [] }
          )
            .then(() => {
              Cart.findOneAndUpdate(
                { _id: cartDes.cartId },
                { totalPrice: newPrice }
              )
                .then(() =>
                  res.status(200).send('Đã chấp nhận yêu cầu của garage')
                )
                .catch((error) => res.status(401).send(error));
            })
            .catch((error) => res.status(401).send(error));
        })
        .catch((error) => res.status(401).send(error));
    } else {
      res.status(401).send('Không tìm thấy giỏ hàng có ID này');
    }
  }

  // [DELETE] api/cartDescription/delete
  delete(req, res, next) {
    const id = req.query?.id;
    if (id) {
      CartDescription.findOneAndUpdate({ _id: id }, { productAdd: [] })
        .then(() => {
          Cart.findOne({ _id: id })
            .then((cart) => {
              res.status(200).send('Xóa sản phẩm thêm bởi garage thành công');
            })
            .catch((error) => res.status(401).send(error));
          //Cart.findOneAndUpdate({ _id: id }, { productStatus: '' })
          //    .then((cart) => {
          //        console.log(cart?.productStatus);
          //        res.status(200).send(cart?.productStatus);
          //    })
          //    .catch((error) => res.status(401).send(error));
        })
        .catch((error) => {
          res.status(401).send(error);
        });
    } else {
      res.staus(401).send('Thiếu query (id: _id)');
    }
  }
}

module.exports = new CartDescriptionController();
