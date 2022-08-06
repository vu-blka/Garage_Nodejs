const User = require('../models/User.model');
const Account = require('../models/Account.model');
const jsonwebtoken = require('jsonwebtoken');

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
    // create(req, res, next) {
    //     const user = new User(req.body);
    //     user.save()
    //         .then(() => {
    //             res.status(200).send('Them user thanh cong!');
    //         })
    //         .catch((error) => res.send(error));
    // }
}

module.exports = new UserController();
