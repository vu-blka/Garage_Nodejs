const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Bill = {
    cartId: { type: Schema.Types.ObjectId, ref: 'Cart' },
    createAt: { type: Date },
    taxCode: { type: String },
    createEmployeeId: { type: Schema.Types.ObjectId, ref: 'Employee' },
};

module.exports = Schemal.model('Bill', Bill);
