const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartDescription = new Schema({
    cartId: { type: Schema.Types.ObjectId, ref: 'Cart' },
    //id: {type: Number, unique: true},
    products: [
        {
            productId: { type: Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number },
            typeProduct: { type: String },
        },
    ],
    services: [
        {
            serviceId: { type: Schema.Types.ObjectId, ref: 'Service' },
            quantity: { type: Number },
            typeProduct: { type: String },
        },
    ],
    productAdd: [
        {
            //refId: { type: Schema.Types.ObjectId, ref: 'Product Service' },
            productId: { type: Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number },
            typeProduct: { type: String },
        },
    ],
});

module.exports = mongoose.model('CartDescription', CartDescription);
