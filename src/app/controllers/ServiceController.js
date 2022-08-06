const Service = require('../models/Service.model');

class ServiceController {
    // [GET] api/services/service/
    getAll(req, res, next) {
        Service.find({})
            .then((service) => {
                res.send(service);
            })
            .catch((err) => res.send(error));
    }
}

module.exports = new ServiceController();
