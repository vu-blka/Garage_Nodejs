const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Product = new Schema({
    productId: { type: Number, unique: true },
    name: { type: String, maxLength: 200 },
    image: { type: String },
    quantity: { type: Number },
    price: { type: Number },
    manufacturerId: { type: Schema.Types.ObjectId, ref: 'Manufacturer' },
    productTypeId: { type: Schema.Types.ObjectId, ref: 'ProductType' },
    deleted: { type: Boolean },
    deletedAt: { type: String },
});

Product.plugin(AutoIncrement, { inc_field: 'productId' });
Product.plugin(
    mongoose_delete,
    { overrideMethods: 'all' },
    { indexFields: ['deletedAt'] }
);

module.exports = mongoose.model('Product', Product);
