const Account = require('../models/Account.model');
const User = require('../models/User.model');
const jwt = require('jsonwebtoken');

class AccountController {
    // [GET] /api/account/get-all
    getAll(req, res, next) {
        Account.find({})
            .populate({ path: 'role' })
            .then((account) => res.status(200).send(account))
            .catch((error) => res.status(401).send(error));
    }

    //  [POST] /api/account/signin
    async signin(req, res, next) {
        const data = req?.body;
        const account = await Account.findOne({ username: data?.username });
        if (account) {
            const result = await account.comparePassword(data?.password);
            if (result) {
                Account.findOne({
                    username: data?.username,
                })
                    .populate({ path: 'role', select: 'roleName -_id' })
                    .select('-password -ownerId -__v')

                    .then((info) => {
                        if (info) {
                            const accessToken = jwt.sign(
                                {
                                    username: info.username,
                                    accountId: info.accountId,
                                    _id: info._id,
                                },
                                'RESTFULAPIs'
                            );

                            res.status(200).json({
                                ...info._doc,
                                accessToken,
                            });
                        } else
                            res.status(401).send(
                                'Authentication failed. Invalid user or password.'
                            );
                    })
                    .catch((error) => {
                        res.status(401).send(error);
                    });
            } else {
                res.status(401).send(
                    'Authentication failed. Invalid password.'
                );
            }
        } else {
            res.status(401).send(
                'Authentication failed. Username is not exist'
            );
        }
    }

    //  [POST] /api/account/signup
    signup(req, res, next) {
        const data = req?.body;
        const account = new Account(data);
        account
            .save()
            .then(() => res.status(200).send('OK'))
            .catch((error) => res.status(401).send(error));
        //if (data) {
        //    Account.countDocuments({ username: data?.username }).then(
        //        (count) => {
        //            if (count) {
        //                res.status(401).send(
        //                    'Tài khoản này đã tồn tại, vui lòng nhập tài khoản khác'
        //                );
        //            } else {
        //                const user = new User();
        //                user.idCardNumber = data?.idCardNumber;
        //                user.name = '';
        //                user.address = '';
        //                user.dob = '';
        //                user.email = '';
        //                user.phoneNumber = '';
        //                user.avatar = '';
        //                user.save()
        //                    .then((user) => {
        //                        const account = new Account(data);
        //                        account.role = '62e2c9b71505cb7220485c58';
        //                        account.ownerId = user._id;
        //                        account
        //                            .save()
        //                            .then(() =>
        //                                res
        //                                    .status(200)
        //                                    .send(
        //                                        'Đăng ký tài khoản thành công'
        //                                    )
        //                            )
        //                            .catch((error) => {
        //                                res.status(401).send(error);
        //                            });
        //                    })
        //                    .catch((error) => {
        //                        res.status(401).send(error);
        //                    });
        //            }
        //        }
        //    );
        //} else {
        //    res.status(401).send('Thiếu databody');
        //}
    }
}

module.exports = new AccountController();
