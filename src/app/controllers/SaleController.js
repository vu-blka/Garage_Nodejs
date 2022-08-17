const Sale = require('../models/Sale.model');

class SaleController {
  //  [GET] /api/sale/get-all
  getAll(req, res, next) {
    Sale.find({})
      .then((sale) => res.status(200).send(sale))
      .catch((error) => res.status(401).send(error));
  }

  // [POST] /api/Sale/create
  create(req, res, next) {
    if (JSON.stringify(req.body) === '{}') res.status(400).send('Missing data');
    else {
      const sale = new Sale(req.body);
      sale
        .save()
        .then(() => {
          res.status(200).send(sale);
        })
        .catch((error) => {
          res.status(400).send(error);
        });
    }
  }
}

module.exports = new SaleController();
