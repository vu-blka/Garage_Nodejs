const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PriceChangeDescription = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    serviceId: { type: Schema.Types.ObjectId, ref: 'Service' },
    employeeId: { type: Schema.Types.ObjectId, ref: 'Employee' },
    applyDate: { type: Date },
    newPrice: { type: Number },
});

module.exports = Schema.model('PriceChangeDescription', PriceChangeDescription);
