const CartDescription = require('../models/CartDescription.model');
const Product = require('../models/Product.model');

class CartDescriptionController {
    // [GET] api/cartDescription/get-all
    getAll(req, res, next) {
        CartDescription.find({})
            .then((cartDes) => {
				res.status(200).send(cartDes);
			})
            .catch((error) => res.status(401).send(error));
    }

	// [GET] api/cartDescription/get-cartdes-by-id
	getById(req, res, next) {
		const id = req?.query?.id;
        CartDescription.findOne({_id: id})
            .then((cartDes) => {
				res.status(200).send(cartDes);
			})
            .catch((error) => res.status(401).send(error));
    }
    //// [POST] api/description/createAt
    //create(req, res, next) {
    //    const description = new Description(req.body);
    //    if (description) {
    //        description
    //            .save()
    //            .then(() => {
    //                res.status(200).send('Them mo ta thanh cong!');
    //            })
    //            .catch((error) => {
    //                console.log(error);
    //                res.status(401).send(error);
    //            });
    //    } else {
    //        res.status(401).send('Vui long nhap du lieu');
    //    }
    //}
}

module.exports = new CartDescriptionController();
