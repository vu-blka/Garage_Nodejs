const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
// const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

mongoose.plugin(slug);

const Product = new Schema({
    productId: { type: String, unique: true },
    name: { type: String, maxLength: 200 },
    image: {
        data: Buffer,
        contentType: String,
    },
    description: { type: String },
    quantity: { type: Number },
    price: { type: Number },
    videoId: { type: String },
    slug: { type: String, slug: 'name', unique: true },
    manufacturerId: { type: Schema.Types.ObjectId, ref: 'Manufacturer' },
    productTypeId: { type: Schema.Types.ObjectId, ref: 'ProductType' },

    // deleted: Boolean,
});

// Product.plugin(mongoose_delete, {overrideMethods: 'all'});

module.exports = mongoose.model('Product', Product);
