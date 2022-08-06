const ServiceType = require('../models/ServiceType.model');

class ServiceTypeController {
    //  [GET] /api/serviceType/get-all
    getAll(req, res, next) {
        ServiceType.find({})
            .then((serviceType) => res.status(200).send(serviceType))
            .catch((error) => res.status(401).send(error));
    }

    // [POST] /api/serviceType/create
    create(req, res, next) {
        if (JSON.stringify(req.body) === '{}') res.status(400).send('Missing data');
        else {
            const serviceType = new ServiceType(req.body);
            serviceType
                .save()
                .then(() => {
                    res.status(200).send(serviceType);
                })
                .catch((error) => res.status(400).send());
        }
    }
}

module.exports = new ServiceTypeController();
