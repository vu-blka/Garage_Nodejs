const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Bill = {
    cart: { type: Schema.Types.ObjectId, ref: 'Cart' },
    cartId: { type: Number },
    createAt: { type: Date },
    taxCode: { type: String },
    createEmployeeId: { type: Schema.Types.ObjectId, ref: 'User' },
};

module.exports = mongoose.model('Bill', Bill);
