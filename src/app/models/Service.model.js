const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;

const Service = new Schema({
    serviceId: { type: String, unique: true },
    name: { type: String },
    image: { type: String },
    // description: { type: String },
    price: { type: Number },
    serviceTypeId: { type: Schema.Types.ObjectId, ref: 'ServiceType' },
    deleted: { type: Boolean },
    deletedAt: { type: String },
});

Service.plugin(
    mongoose_delete,
    { overrideMethods: 'all' },
    { indexFields: ['deletedAt'] }
);

module.exports = mongoose.model('Service', Service);
