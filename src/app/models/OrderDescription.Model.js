const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderDescription = new Schema({
    orderId: { type: Schema.Types.ObjectId, ref: 'Order' },
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number },
});

module.exports = Schema.model('OrderDescription', OrderDescription);
