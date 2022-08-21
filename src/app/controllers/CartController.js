const Cart = require('../models/Cart.model');
const User = require('../models/User.model');
const Status = require('../models/Status.model');
const CartDescription = require('../models/CartDescription.model');

class CartController {
    //  [GET] /api/cart/get-all
    getAll(req, res, next) {
        Cart.find({})
            .populate({ path: 'idUser', select: 'name' })
            .populate({ path: 'statusId' })
            .then((cart) => {
                res.status(200).send(cart);
            })
            .catch((error) => {
                res.status(401).send(error);
            });
    }

    //  [GET] /api/cart/get-cart-by-id
    getById(req, res, next) {
        const id = req?.query?.id;
        if (id) {
            User.findOne({ idCardNumber: id }).then((user) => {
                if (user) {
                    //CartDescription.findOne({})
                    //    .then((cart) => {
                    //        if (cart) {
                    //            res.send(cart);
                    //        } else {
                    //            res.send(cart?.productAdd);
                    //        }
                    //    })
                    //    .catch((error) => {
                    //        res.status(401).send(error);
                    //    });
                    Cart.find({ idUser: user._id })
                        .populate({ path: 'idUser', select: 'name' })
                        .populate({ path: 'statusId' })
                        .then((cart) => {
                            cart.map((value) => {
                                CartDescription.findOne({ cartId: value._id })
                                    .then((cartDes) => {
                                        if (cartDes?.productAdd.length > 0) {
                                            value.statusProduct =
                                                'waitingConfirm';
                                        } else {
                                            value.statusProduct = '';
                                        }
                                        value.save();
                                    })
                                    .catch((error) =>
                                        res.status(401).send(error)
                                    );
                            });
                            res.status(200).send(cart);
                        })
                        .catch((error) => {
                            res.status(401).send(error);
                        });
                } else {
                    res.status(401).send('Không có Id của user này');
                }
            });
        } else {
            res.status(401).send('Thiếu param (id: _idUser)');
        }
    }

    //  [POST] /api/cart/create
    create(req, res, next) {
        const data = req?.body;
        if (JSON.stringify(data) === '{}' || !data) {
            res.status(401).send('Thieu data');
        } else {
            const cart = new Cart(data);
            //cart.cartId = 1;
            cart.createAt = new Date();
            cart.statusId = '62fa16af20d59d057db12c05';
            const products = data?.products;
            const services = data?.services;
            const cartDes = new CartDescription();
            cart.save()
                .then((cart) => {
                    const cartId = cart._id;
                    cartDes.cartId = cartId;
                    cartDes.products = products;	
                    cartDes.services = services;
                    cartDes
                        .save()
                        .then(() => {
                            res.status(200).send(
                                'Thêm vào giỏ hàng thành công'
                            );
                        })
                        .catch((error) => {
                            console.log(error);
                            res.status(401).send(error);
                        });
                })
                .catch((error) => {
                    console.log(error);
                    res.status(401).send(error);
                });
        }
    }

    //  [DELETE] /api/cart/delete/:id
    delete(req, res, next) {
        const param = req.params?.id;
        if (!param) {
            res.status(401).send('Khong co param');
        } else {
            Cart.countDocuments({ cartId: param })
                .then((count) => {
                    if (count > 0) {
                        Cart.delete({ cartId: param })
                            .then(() => {
                                res.status(200).send('Xoa don hang thanh cong');
                            })
                            .catch((error) =>
                                res.status(401).send('Khong xoa duoc')
                            );
                    } else {
                        res.status(401).send(
                            'Khong co don hang nay hoac don hang da bi xoa'
                        );
                    }
                })
                .catch((error) => res.status(401).send(error));
        }
    }

    //[UPDATE] /api/cart/update/:id
    update(req, res, next) {
        const param = req?.params?.id;
        if (!param) {
            res.status(401).send('Khong co param');
        } else {
            const body = req?.body;
            Cart.countDocuments({ cartId: param }).then((count) => {
                if (count > 0) {
                    if (JSON.stringify(body) !== '{}') {
                        const status = body?.statusId;
                        if (status) {
                            Status.find({ statusId: status })
                                .then((status) => {
                                    body.statusId = status[0]._id;
                                    Cart.updateOne({ cartId: param }, body)
                                        .then(() => {
                                            res.status(200).send(
                                                'Sua don hang thanh cong'
                                            );
                                        })
                                        .catch((error) =>
                                            res.status(401).send(error)
                                        );
                                })
                                .catch((error) => res.status(401).send(error));
                        } else {
                            res.send('Khong co status');
                        }
                    } else {
                        res.status(401).send('Khong co du lieu body');
                    }
                } else {
                    res.status(401).send('Khong co ma don hang nay');
                }
            });
        }
    }

    // [PATCH] /api/cart/updateStatus
    updateStatus(req, res, next) {
        const data = req?.body;
        if (data) {
            Status.findOne({ statusId: data?.statusId })
                .then((status) => {
                    if (status) {
                        Cart.findOneAndUpdate(
                            { cartId: data?.cartId },
                            { statusId: status._id }
                        )
                            .then(() =>
                                res.status(200).send('Update status thành công')
                            )
                            .catch(() => res.status(401).send(error));
                    } else {
                        res.status(401).send(
                            'Không có status tương ứng với statusID này'
                        );
                    }
                })
                .catch((error) => {
                    res.status(401).send(error);
                });
        } else {
            res.status(401).send('Thiếu body data');
        }
    }
}

module.exports = new CartController();
