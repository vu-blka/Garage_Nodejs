const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SaleDescription = new Schema({
  refId: { type: Schema.Types.ObjectId, ref: 'Product Service' },
  saleId: { type: Schema.Types.ObjectId, ref: 'Sale' },
  salePercent: { type: Number },
});

module.exports = mongoose.model('SaleDescription', SaleDescription);
