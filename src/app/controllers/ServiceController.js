const Service = require('../models/Service.model');
const ServiceType = require('../models/ServiceType.model');

class ServiceController {
    // [GET] api/service/
    getAll(req, res, next) {
        Service.find({})
            .populate({
                path: 'serviceTypeId',
                select: '-_id -__v',
            })
            .select('-__v -description ')
            .then((service) => {
                res.send(service);
            })
            .catch((err) => res.send(error));
    }

    // [GET] api/service/get-service-by-type
    getServiceByType(req, res, next) {
        const param = req.query?.serviceTypeId;
        if (!param)
            res.status(401).send(
                'Thieu param hoac ten param sai (serviceTypeId)'
            );
        else {
            Service.find({})
                .populate({
                    path: 'serviceTypeId',
                    select: 'serviceTypeId serviceTypeName',
                    match: { serviceTypeId: param },
                })
                .select('-__v -description')
                .then((service) => {
                    const data = service.filter(
                        (value) => value.serviceTypeId != null
                    );
                    res.status(200).send(data);
                })
                .catch((error) => res.status(401).send(error));
        }
    }

    // [POST] api/service/create
    createService(req, res, next) {
        const service = new Service(req.body);
        service
            .save()
            .then(() => {
                res.status(200).send('Them service thanh cong!');
            })
            .catch((error) => res.send(error));
    }
}

module.exports = new ServiceController();
