const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartDescription = new Schema({
    cartId: {type: Schema.Types.ObjectId, ref: 'Cart'},
	//id: {type: Number, unique: true},
    products: [{type: Object}],
    services: [{type: Object}]
});

module.exports = mongoose.model('CartDescription', CartDescription);
