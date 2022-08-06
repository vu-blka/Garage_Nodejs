const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Service = new Schema({
    serviceId: { type: String, unique: true },
    name: { type: String },
    image: { type: String },
    description: { type: String },
    price: { type: Number },
    serviceTypeId: { type: Schema.Types.ObjectId, ref: 'ServiceType' },
});

module.exports = mongoose.model('Service', Service);
