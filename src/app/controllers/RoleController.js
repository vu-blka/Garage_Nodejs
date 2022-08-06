const Role = require('../models/Role.model');

class RoleController {
    //  [GET] /api/role/
    getAll(req, res, next) {
        Role.find({})
            .then((role) => {
                res.send(role);
            })
            .catch((error) => res.send(error));
    }

    //  [POST] /api/role/create
    create(req, res, next) {
        const role = new Role(req.body);
        role.save()
            .then(() => {
                res.status(200).send('Them role thanh cong!');
            })
            .catch((error) => res.send(error));
    }
}

module.exports = new RoleController();
