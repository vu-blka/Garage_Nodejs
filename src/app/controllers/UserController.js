const User = require('../models/User.model');
const Account = require('../models/Account.model');
const jsonwebtoken = require('jsonwebtoken');

const ObjectId = require('mongodb').ObjectID;

class UserController {
    //  [GET] api/user/getUserInfo
    getUserInfo(req, res, next) {
        const authorizationClient = req.headers['authorization'];
        const bearer = authorizationClient?.split(' ')[0] === 'Bearer';
        const token = authorizationClient?.split(' ')[1];

        if (!token) res.status(401).send();

        if (token && bearer) {
            jsonwebtoken.verify(token, 'RESTFULAPIs', function (err, decode) {
                if (err) req.user = undefined;
                const idMap = decode._id;
                User.findOne({ account: idMap })
                    .select('-__v')
                    .populate({
                        path: 'account',
                        select: 'accountId username -_id',
                        populate: { path: 'role', select: 'roleName -_id' },
                    })
                    .then((user) => {
                        res.send(user);
                    })
                    .catch((error) => res.send(error));
            });
        } else {
            res.status(401).send();
        }
    }

    //  [POST] /api/user/add
    create(req, res, next) {
        const user = new User(req.body);
        user.save()
            .then(() => {
                res.status(200).send('Them user thanh cong!');
            })
            .catch((error) => res.send(error));
    }

    //  [PATCH] /api/user/update
    async update(req, res, next) {
        const id = req.params?.id;
        const user = req.body;
        if (!id || JSON.stringify(user) === '{}')
            res.status(401).send(
                'Thieu param/body hoac ten param sai (id). Truyen (_id) nhé'
            );
        else {
            const count = await User.countDocuments({
                _id: new ObjectId(id),
            }).exec();

            if (count > 0) {
                User.updateOne({ _id: new ObjectId(id) }, user)
                    .then(() => {
                        res.status(200).send('Sua thong tin thanh cong');
                    })
                    .catch((error) => res.status(401).send(error));
            } else {
                res.status(401).send('Khong ton tai user co ma id nay');
            }
            // user.updateOne({}, user)
            //     .then(() => {
            //         res.status(200).send('Them user thanh cong!');
            //     })
            //     .catch((error) => res.send(error));
        }
    }
}

module.exports = new UserController();
