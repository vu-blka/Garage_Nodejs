const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestoreSlipDescription = new Schema({
    restoreBillId: { type: Schema.Types.ObjectId, ref: 'RestoreSlip' },
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
});

module.exports = Schema.model('RestoreSlipDescription', RestoreSlipDescription);
