const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
    orderId: { type: String },
    createAt: { type: Date },
    totalPrice: { type: Number },
    statusId: { type: Schema.Types.ObjectId, ref: 'Status' },
    supplierId: { type: Schema.Types.ObjectId, ref: 'Supplier' },
    createEmployeeId: { type: Schema.Types.ObjectId, ref: 'Employee' },
});

module.exports = mongoose.model('Order', Order);
