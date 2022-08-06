const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Sale = new Schema({
    saleId: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    description: { type: String },
});

module.exports = Schema.model('Sale', Sale);
