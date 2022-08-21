const Account = require('../models/Account.model');
const jwt = require('jsonwebtoken');

class AccountController {
  // [GET] /api/account/get-all
  getAll(req, res, next) {
    Account.find({})
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
              res
                .status(401)
                .send('Authentication failed. Invalid user or password.');
          })
          .catch((error) => res.send(error));
      } else {
        res.status(401).send('Authentication failed. Invalid password.');
      }
    } else {
      res.status(401).send('Authentication failed. Username is not exist');
    }
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
