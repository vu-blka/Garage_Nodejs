const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cart = new Schema({
    cartId: {type: String},
    createAt: {type: Date},
    totalPrice: {type: Number},
    statusId: { type: Schema.Types.ObjectId, ref: 'Status' },
    customerId: {type: Schema.Types.ObjectId, ref: 'Customer' },
    shipperEmployeeId: {type: Schema.Types.ObjectId, ref: 'Employee' },
    browseEmployeeId: {type: Schema.Types.ObjectId, ref: 'Employee' },
});

module.exports = Schema.model('Cart', Cart);
