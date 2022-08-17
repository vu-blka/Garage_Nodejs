const Service = require('../models/Service.model');
const Description = require('../models/Description.model');
const ServiceType = require('../models/ServiceType.model');

class ServiceController {
  // [GET] api/service/get-all
  getAll(req, res, next) {
    //Service.find({})
    //    .populate({
    //        path: 'serviceTypeId',
    //        select: '-_id -__v',
    //    })
    //    .select('-__v -description ')
    //    .then((service) => {
    //        res.send(service);
    //    })
    //    .catch((err) => res.send(error));

    Service.aggregate([
      {
        $lookup: {
          from: 'saledescriptions',
          localField: '_id',
          foreignField: 'refId',
          as: 'saledescription',
        },
      },
    ]).exec(function (error, service) {
      Service.populate(service, {
        path: 'serviceTypeId',
        select: '-__v -_id',
      })
        .then((s) => res.status(200).send(s))
        .catch((error) => res.status(401).send(error));
    });
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
        Service.aggregate([
          {
            $match: {
              serviceId: param,
            },
          },
          {
            $lookup: {
              from: 'descriptions',
              localField: '_id',
              foreignField: 'refId',
              as: 'description',
            },
          },
          {
            $project: {
              __v: 0,
            },
          },
          {
            $lookup: {
              from: 'saledescriptions',
              localField: '_id',
              foreignField: 'refId',
              as: 'saledescription',
            },
          },
        ]).exec(function (error, service) {
          Service.populate(service, {
            path: 'serviceTypeId',
            select: '-__v -_id',
          })
            .then((p) => res.status(200).send(p))
            .catch((error) => res.status(401).send(error));
        });
      } else {
        res.status(401).send('Khong tim thay ma dich vu nay');
      }
    }
  }

  // [GET] api/service/get-service-by-type
  async getServiceByType(req, res, next) {
    const param = req.query?.serviceTypeId;
    if (!param)
      res.status(401).send('Thieu param hoac ten param sai (serviceTypeId)');
    else {
      const count = await ServiceType.countDocuments({
        serviceTypeId: param,
      }).exec();
      if (count) {
        Service.aggregate([
          {
            $lookup: {
              from: 'saledescriptions',
              localField: '_id',
              foreignField: 'refId',
              as: 'saledescription',
            },
          },
        ]).exec(function (error, service) {
          Service.populate(service, {
            path: 'serviceTypeId',
            select: '-__v -_id',
            match: { serviceTypeId: param },
          })
            .then((p) =>
              res.send(service.filter((value) => value.serviceTypeId != null))
            )
            .catch((error) => res.status(401).send(error));
        });
      } else {
        res.status(401).send('Khong tim thay loai dich vu nay');
      }
      //Service.find({})
      //  .populate({
      //    path: 'serviceTypeId',
      //    select: 'serviceTypeId serviceTypeName',
      //    match: { serviceTypeId: param },
      //  })
      //  .select('-__v -description')
      //  .then((service) => {
      //    res
      //      .status(200)
      //      .send(service.filter((value) => value.serviceTypeId != null));
      //  })
      //  .catch((error) => res.status(401).send(error));
      //  } else {
      //    res.status(401).send('Khong tim thay ma loai dich vu nay');
      //  }
    }
  }

  // [POST] api/service/create
  create(req, res, next) {
    // const service = new Service(req.body);
    // service
    //     .save()
    //     .then(() => {
    //         res.status(200).send('Them service thanh cong!');
    //     })
    //     .catch((error) => res.send(error));
    const data = req?.body;
    if (JSON.stringify(data) === '{}') {
      res.status(401).send('Data rong');
    } else {
      const service = new Service(data);
      service
        .save()
        .then((service) => {
          const id = service._id;
          const description = data?.description;
          if (!Array.isArray(description)) {
            res
              .status(200)
              .send('Them service thanh cong (khong co description)');
          } else {
            if (JSON.stringify(description) === '[]') {
              res
                .status(200)
                .send('Them service thanh cong (khong co description)');
            } else {
              let des;
              description.map((value) => {
                value.refId = id;
                des = new Description(value);
                des
                  .save()
                  .then(() => console.log('them des thanh cong'))
                  .catch((error) => res.status(401).send(error));
              });
              res.status(200).send('Them service thanh cong (co description)');
            }
          }
        })
        .catch((error) => {
          res.status(401).send(error);
        });
    }
  }

  //[DELETE] api/service/delete/:id
  delete(req, res, next) {
    const param = req.params?.id;
    if (!param) {
      res.status(401).send('Khong co param');
    } else {
      Service.countDocuments({ serviceId: param })
        .then((count) => {
          if (count > 0) {
            Service.delete({ serviceId: param })
              .then(() => {
                res.status(200).send('Xoa dich vu thanh cong');
              })
              .catch((error) => res.status(401).send('Loi khi xoa'));
          } else {
            res.status(401).send('Khong co dich vu nay hoac dich vu da bi xoa');
          }
        })
        .catch((error) => res.status(401).send(error));
    }
  }

  //[UPDATE] /api/service/update/:id
  update(req, res, next) {
    const param = req?.params?.id;
    if (!param) {
      res.status(401).send('Khong co param');
    } else {
      const body = req?.body;
      Service.countDocuments({ serviceId: param }).then((count) => {
        if (count > 0) {
          if (JSON.stringify(body) !== '{}') {
            Service.updateOne({ serviceId: param }, body)
              .then(() => {
                res.status(200).send('Sua service thanh cong');
              })
              .catch((error) => res.status(401).send(error));
          } else {
            res.status(401).send('Khong co du lieu body');
          }
        } else {
          res.status(401).send('Khong co ma san pham nay');
        }
      });
    }
  }
}

module.exports = new ServiceController();
