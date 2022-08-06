const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartDescription = new Schema({
    cartId: {type: String},
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
    services: [{type: Schema.Types.ObjectId, ref: 'Service'}]
});

module.exports = Schema.model('CartDescription', CartDescription);
