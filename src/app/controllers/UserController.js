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

    //if (token && bearer) {
    //    jsonwebtoken.verify(token, 'RESTFULAPIs', function (err, decode) {
    //        if (err) req.user = undefined;
    //        const idMap = decode?._id;
    //        User.findOne({ account: idMap })
    //            .select('-__v')
    //            // .populate({
    //            //     path: 'accountId',
    //            //     select: 'accountId username -_id',
    //            //     populate: { path: 'role', select: 'roleName -_id' },
    //            // })
    //            .then((user) => {
    //                res.status(200).send(user);
    //            })
    //            .catch((error) => res.status(401).send(error));
    //    });
    //} else {
    //    res.status(401).send();
    //}

    if (token && bearer) {
      jsonwebtoken.verify(token, 'RESTFULAPIs', function (err, decode) {
        if (err) req.user = undefined;
        const idMap = decode?._id;
        Account.findOne({ _id: idMap })
          .then((account) => {
            if (account) {
              User.findOne({ _id: account.ownerId })
                .select('-__v')
                .then((user) => {
                  res.status(200).send(user);
                })
                .catch((error) => res.status(401).send(error));
            } else {
              res.status(401).send('Sai m?? Token');
            }
          })
          .catch((error) => res.status(401).send(error));
      });
    } else {
      res.status(401).send();
    }
  }

  // [GET] /api/user/get-all-user
  getAllUser(req, res, next) {
    //Account.find({})
    //    .populate('role')
    //    .then((account) => {
    //        res.status(200).send(account);
    //    })
    //    .catch((error) => res.status(401).send(error));

    Account.find({ role: '62e2c9b71505cb7220485c58' })
      .populate({ path: 'role' })
      .populate({ path: 'ownerId' })
      .then((account) => {
        res.status(200).send(account);
      })
      .catch((error) => {
        res.status(401).send(error);
      });

    //User.aggregate([
    //    {
    //        $lookup: {
    //            from: 'accounts',
    //            localField: '_id',
    //            foreignField: 'ownerId',
    //            as: 'account',
    //        },
    //    },
    //]).exec(function (error, user) {
    //    res.status(200).send(user);
    //});
  }

  //  [POST] /api/user/add
  create(req, res, next) {
    const data = req?.body;
    if (JSON.stringify(data) === '{}') {
      res.status(401).send('Data rong');
    } else {
      const user = new User(data);
      user
        .save()
        .then(() => res.status(200).send('Th??m user th??nh c??ng'))
        .catch((error) => {
          res.status(401).send(error);
        });
    }
  }

  //  [PATCH] /api/user/update
  async update(req, res, next) {
    const data = req?.body;
    if (JSON.stringify(data) === '{}')
      res.status(401).send('Thi???u th??ng tin thay ?????i');
    else {
      const user = await User.findOne({
        idCardNumber: data?.idCardNumber,
      }).exec();
      if (user) {
        User.updateOne({ idCardNumber: data?.idCardNumber }, data)
          .then(() => res.status(200).send('?????i th??ng tin th??nh c??ng!'))
          .catch((error) => res.status(401).send(error));
      } else {
        res.status(401).send('Kh??ng c?? user c?? m?? idCardNumber n??y ');
      }
    }
  }

  // [PATCH] /api/user/update-password
  async updatePass(req, res, next) {
    const data = req?.body;
    if (JSON.stringify(data) === '{}') {
      res.status(401).send('Thieu body (password, newpassword)');
    } else {
      const account = await Account.findOne({ ownerId: data?._id });
      if (account) {
        const result = await account.comparePassword(data?.password);
        if (result) {
          account.password = data?.newPassword;
          account
            .save()
            .then(() => res.status(200).send('?????i m???t kh???u th??nh c??ng'))
            .catch((error) => res.status(401).send(error));
        } else {
          res.status(401).send('Password sai!');
        }
      } else {
        res.status(401).send('Kh??ng c?? account n??y');
      }
    }
  }

  // [DELETE] /api/user/delete/:id (idCardNumber)
  delete(req, res, next) {
    const param = req?.params?.id;
    if (!param) {
      res.status(401).send('Kh??ng c?? param');
    } else {
      User.countDocuments({ idCardNumber: param }).then((count) => {
        if (count > 0) {
          User.delete({ idCardNumber: param })
            .then(() => res.status(200).send('X??a user th??nh c??ng'))
            .catch((error) => res.status(401).send(error));
        } else {
          res.status(401).send('Kh??ng c?? user c?? m?? idCardNumber n??y');
        }
      });
    }
  }
}

module.exports = new UserController();
