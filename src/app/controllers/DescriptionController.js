const Description = require('../models/Description.model');

class DescriptionController {
    // [GET] api/description/get-all
    getAll(req, res, next) {
        Description.find({})
            .then((description) => res.status(200).send(description))
            .catch((error) => res.status(401).send(error));
    }

    // [POST] api/description/createAt
    create(req, res, next) {
        const description = new Description(req.body);
        if (description) {
            description
                .save()
                .then(() => {
                    res.status(200).send('Them mo ta thanh cong!');
                })
                .catch((error) => {
                    console.log(error);
                    res.status(401).send(error);
                });
        } else {
            res.status(401).send('Vui long nhap du lieu');
        }
    }
}

module.exports = new DescriptionController();
