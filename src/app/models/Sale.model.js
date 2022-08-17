const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Sale = new Schema({
  saleId: { type: Number, unique: true },
  startDate: { type: Date },
  endDate: { type: Date },
  description: { type: String },
});

module.exports = mongoose.model('Sale', Sale);
