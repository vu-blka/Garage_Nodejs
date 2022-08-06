const Manufacturer = require('../models/Manufacturer.model');

class ManufacturerController {
//  [GET] /api/manufacturer/get-all
    getAll(req, res, next) {
        Manufacturer.find({}).select('-_id -__v')
            .then((manu) => res.status(200).send(manu))
            .catch((error) => res.status(401).send(error));
    }

//  [POST] /api/manufacturer/create
    create(req, res, next){
        const manufacturer = new Manufacturer(req.body);

        if(JSON.stringify(manufacturer) === '{}') res.status(400).send()
        else
        {
            manufacturer
                .save()
                .then(() => {
                    res.status(200).send(manufacturer);
                })
                .catch(error => res.status(400).send(error))
        }

    }
}

module.exports = new ManufacturerController();
