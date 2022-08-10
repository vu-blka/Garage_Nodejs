const Service = require('../models/Service.model');
const ServiceType = require('../models/ServiceType.model');

class ServiceController {
    // [GET] api/service/get-all
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

    // [GET] api/service/get-service-by-id
    async getServiceById(req, res, next) {
        const param = req.query?.serviceId;
        if (!param)
            res.status(401).send('Thieu param hoac ten param sai (serviceId)');
        else {
            const count = await Service.countDocuments({
                serviceId: param,
            }).exec();
            if (count) {
                Service.find({ serviceId: param })
                    .populate({
                        path: 'serviceTypeId',
                        select: 'serviceTypeId serviceTypeName',
                    })
                    .select('-__v')
                    .then((service) => {
                        res.status(200).send(service);
                    })
                    .catch((error) => res.status(401).send(error));
            } else {
                res.status(401).send('Khong tim thay ma dich vu nay');
            }
        }
    }

    // [GET] api/service/get-service-by-type
    async getServiceByType(req, res, next) {
        const param = req.query?.serviceTypeId;
        if (!param)
            res.status(401).send(
                'Thieu param hoac ten param sai (serviceTypeId)'
            );
        else {
            const count = await ServiceType.countDocuments({
                serviceTypeId: param,
            }).exec();
            if (count) {
                Service.find({})
                    .populate({
                        path: 'serviceTypeId',
                        select: 'serviceTypeId serviceTypeName',
                        match: { serviceTypeId: param },
                    })
                    .select('-__v -description')
                    .then((service) => {
                        res.status(200).send(
                            service.filter(
                                (value) => value.serviceTypeId != null
                            )
                        );
                    })
                    .catch((error) => res.status(401).send(error));
            } else {
                res.status(401).send('Khong tim thay ma loai dich vu nay');
            }
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
