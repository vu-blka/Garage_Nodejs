const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema({
    accountId: { type: Schema.Types.ObjectId, ref: 'Account' },
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    serviceId: { type: Schema.Types.ObjectId, ref: 'Service' },
    star: { type: Number, min: 1, max: 5 },
    description: { type: String, max: 255 },
});

module.exports = mongoose.model('Comment', Comment);
