const SaleDescription = require('../models/SaleDescription.model');

class SaleDescriptionController {
  //  [GET] /api/saleDescription/get-all
  getAll(req, res, next) {
    SaleDescription.find({})
      .then((saleDes) => res.status(200).send(saleDes))
      .catch((error) => res.status(401).send(error));
  }

  // [POST] /api/saleDescription/create
  create(req, res, next) {
    if (JSON.stringify(req.body) === '{}') res.status(400).send('Missing data');
    else {
      const saleDes = new SaleDescription(req.body);
      saleDes
        .save()
        .then(() => {
          res.status(200).send(saleDes);
        })
        .catch((error) => {
          res.status(400).send(error);
        });
    }
  }
}

module.exports = new SaleDescriptionController();
