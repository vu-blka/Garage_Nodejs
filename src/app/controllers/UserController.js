const User = require('../models/User.model');
const Account = require('../models/Account.model');
const jsonwebtoken = require('jsonwebtoken');

const ObjectId = require('mongodb').ObjectID;

class UserController {
    // [GET] api/user/get-all
    getAll(req, res, next) {
        User.find({})
            .select('-__v')
            .then((user) => res.status(200).send(user))
            .catch((error) => res.status(401).send(error));
    }

    //  [GET] api/user/getUserInfo
    getUserInfo(req, res, next) {
        const authorizationClient = req.headers['authorization'];
        const bearer = authorizationClient?.split(' ')[0] === 'Bearer';
        const token = authorizationClient?.split(' ')[1];

        if (!token) res.status(401).send();

        if (token && bearer) {
            jsonwebtoken.verify(token, 'RESTFULAPIs', function (err, decode) {
                if (err) req.user = undefined;
                const idMap = decode?._id;
                User.findOne({ account: idMap })
                    .select('-__v')
                    // .populate({
                    //     path: 'accountId',
                    //     select: 'accountId username -_id',
                    //     populate: { path: 'role', select: 'roleName -_id' },
                    // })
                    .then((user) => {
                        res.status(200).send(user);
                    })
                    .catch((error) => res.status(401).send(error));
            });
        } else {
            res.status(401).send();
        }
    }

    //  [POST] /api/user/add
    create(req, res, next) {
        const data = req?.body;
        if (JSON.stringify(data) === '{}') {
            res.status(401).send('Data rong');
        } else {
            const user = new User(data);
            user.save()
                .then(() => res.status(200).send('Them user thanh cong'))
                .catch((error) => {
                    res.status(401).send(error);
                });
        }
    }

    //  [PATCH] /api/user/update
    async update(req, res, next) {
        const id = req.params?.id;
        const user = req?.body;
        if (!id || JSON.stringify(user) === '{}')
            res.status(401).send(
                'Thieu param/body hoac ten param sai. Truyen idCardNumber'
            );
        else {
            const count = await User.countDocuments({
                idCardNumber: id,
            }).exec();

            if (count > 0) {
                User.updateOne({ idCardNumber: id }, user)
                    .then(() => {
                        res.status(200).send('Sua thong tin thanh cong');
                    })
                    .catch((error) => res.status(401).send(error));
            } else {
                res.status(401).send('Khong ton tai user co ma id nay');
            }
        }
    }

    // [DELETE] /api/user/delete/:id (idCardNumber)
    delete(req, res, next) {
        const param = req?.params?.id;
        if (!param) {
            res.status(401).send('Khong co param');
        } else {
            User.countDocuments({ idCardNumber: param }).then((count) => {
                if (count > 0) {
                    User.delete({ idCardNumber: param })
                        .then(() => res.status(200).send('Xoa user thanh cong'))
                        .catch((error) => res.status(401).send(error));
                } else {
                    res.status(401).send(
                        'Khong co user co ma idCardNumber nay'
                    );
                }
            });
        }
    }
}

module.exports = new UserController();
