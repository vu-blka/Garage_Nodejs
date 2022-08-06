const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestoreSlip = new Schema({
    restoreBillId: { type: String },
    createAt: { type: Date },
    billId: { type: Schema.Types.ObjectId, ref: 'Bill' },
    createEmployeeId: {type: Schema.Types.ObjectId,ref: 'Employee'},
});

module.exports = Schema.model('RestoreSlip', RestoreSlip);
