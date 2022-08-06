const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Supplier = new Schema({
    supplierId: { type: String },
    name: { type: String },
    address: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
});

module.exports = Schema.model('Supplier', Supplier);
