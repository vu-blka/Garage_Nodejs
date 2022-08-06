const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImportSlipDescription = new Schema({
    importBillId: { type: Schema.Types.ObjectId, ref: 'ImportSlip' },
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
});

module.exports = Schema.model('ImportSlipDescription', ImportSlipDescription);
