const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Service = new Schema({
    serviceId: { type: Number, unique: true },
    name: { type: String },
    image: { type: String },
    price: { type: Number },
    serviceTypeId: { type: Schema.Types.ObjectId, ref: 'ServiceType' },
    deleted: { type: Boolean },
    deletedAt: { type: String },
});

Service.plugin(AutoIncrement, { inc_field: 'serviceId' });
Service.plugin(
    mongoose_delete,
    { overrideMethods: 'all' },
    { indexFields: ['deletedAt'] }
);

module.exports = mongoose.model('Service', Service);
