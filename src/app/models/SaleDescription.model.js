const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SaleDescription = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    serviceId: { type: Schema.Types.ObjectId, ref: 'Service' },
    saleId: { type: Schema.Types.ObjectId, ref: 'Sale' },
    salePercent: { type: Number },
});

module.exports = Schema.model('SaleDescription', SaleDescription);
