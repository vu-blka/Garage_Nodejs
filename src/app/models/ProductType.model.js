const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductType = new Schema({
    productTypeId: { type: String, unique: true },
    productTypeName: { type: String },
});

module.exports = mongoose.model('ProductType', ProductType);
