const Status = require('../models/Status.model');

class StatusController {
    //  [GET] /api/status/get-all
    getAll(req, res, next) {
        Status.find({})
            .then((status) => {
                res.send(status);
            })
            .catch((error) => res.send(error));
    }

    // [POST] /api/cart/create
    create(req, res, next) {
        const status = new Status(req.body);
        status
            .save()
            .then(() => {
                res.status(200).send('Them trang thai thanh cong!');
            })
            .catch((error) => res.send(error));
    }
}

module.exports = new StatusController();
