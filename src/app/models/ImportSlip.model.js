const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImportSlip = new Schema({
    importBillId: { type: String },
    createAt: { type: Date },
    orderId: { type: Object.Types.ObjectId, ref: 'Order' },
    createEmployeeId: {type: Object.Types.ObjectId, ref: 'Employee'},
});

module.exports = Schema.model('ImportSlip', ImportSlip);
