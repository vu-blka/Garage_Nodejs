const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceType = new Schema({
    serviceTypeId: { type: String, unique: true },
    serviceTypeName: { type: String },
});

module.exports = mongoose.model('ServiceType', ServiceType);
