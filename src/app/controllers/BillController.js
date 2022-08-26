const Bill = require('../models/Bill.model');
const Cart = require('../models/Cart.model');

class BillController {
    // [GET] api/bill/get-all
    getAll(req, res, next) {
        //Bill.aggregate([
        //    {
        //        $lookup: {
        //            from: 'carts',
        //            localField: 'cartId',
        //            foreignField: 'cartId',
        //            as: 'cart',
        //        },
        //    },
        //]).exec(function (error, user) {
        //    Bill.populate(user, {
        //        path: 'createEmployeeId',
        //        select: '-__v',
        //    })
        //        .then((b) => res.status(200).send(b))
        //        .catch((error) => res.status(401).send(error));
        //});
        Bill.aggregate([
            {
                $lookup: {
                    from: 'carts',
                    localField: 'cartId',
                    foreignField: 'cartId',
                    as: 'cart',
                },
            },
            //{
            //    $lookup: {
            //        from: 'User',
            //        localField: 'cart.idUser',
            //        foreignField: '_id',
            //        as: 'cart.UserInfo',
            //    },
            //},
        ]).exec(function (error, user) {
            Bill.populate(user, {
                path: 'createEmployeeId',
                select: '-__v',
            })
                .then((b) => res.status(200).send(b))
                .catch((error) => res.status(401).send(error));
        });
    }

    // [POST] api/bill/create
    create(req, res, next) {
        const bill = new Bill(req?.body);
        const cartId = bill?.cartId;
        if (bill) {
            Cart.delete({ cartId: cartId })
                .then(() => {
                    bill.taxCode = '';
                    bill.createAt = new Date();
                    bill.save()
                        .then(() => {
                            res.status(200).send('Tạo hóa đơn thành công!');
                        })
                        .catch((error) => {
                            res.status(401).send(error);
                        });
                })
                .catch((error) => {
                    res.status(401).send(error);
                    console.log(error);
                });
        } else {
            res.status(401).send(
                'Vui lòng truyền đầy đủ dữ liệu (cartId + userId)'
            );
        }
    }
}

module.exports = new BillController();
