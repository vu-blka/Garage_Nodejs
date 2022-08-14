const Account = require('../models/Account.model');
const jwt = require('jsonwebtoken');

class AccountController {
    //  [GET] /api/account/signin
    signin(req, res, next) {
        Account.findOne({
            username: req.body.username,
            password: req.body.password,
        })
            .populate({ path: 'role', select: 'roleName -_id' })
            .select('-password')

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
            .catch((error) => res.send(error));
    }

    //  [POST] /api/account/signup
    signup(req, res, next) {
        const account = new Account(req.body);
        account
            .save()
            .then(() => {
                res.status(200).send('Them tai khoan thanh cong');
            })
            .catch((error) => {
                res.send(error);
            });
    }
}

module.exports = new AccountController();
