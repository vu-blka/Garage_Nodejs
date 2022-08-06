const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Manufacturer = new Schema({
    manufacturerId: { type: String, unique: true },
    manufacturerName: { type: String },
});

module.exports = mongoose.model('Manufacturer', Manufacturer);
