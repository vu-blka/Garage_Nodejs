const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;

const CartDescription = new Schema({
    cartId: { type: Schema.Types.ObjectId, ref: 'Cart' },
    //id: {type: Number, unique: true},
    products: [
        {
            productId: { type: Schema.Types.ObjectId, ref: 'Product' },
            productPrice: { type: Number },
            quantity: { type: Number },
            typeProduct: { type: String },
        },
    ],
    services: [
        {
            serviceId: { type: Schema.Types.ObjectId, ref: 'Service' },
            servicePrice: { type: Number },
            quantity: { type: Number },
            typeProduct: { type: String },
        },
    ],
    productAdd: [
        {
            //refId: { type: Schema.Types.ObjectId, ref: 'Product Service' },
            productId: { type: Schema.Types.ObjectId, ref: 'Product' },
            productPrice: { type: Number },
            quantity: { type: Number },
            typeProduct: { type: String },
        },
    ],
});

CartDescription.plugin(
    mongoose_delete,
    { overrideMethods: 'all' },
    { indexFields: ['deletedAt'] }
);

module.exports = mongoose.model('CartDescription', CartDescription);
