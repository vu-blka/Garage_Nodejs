const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;

const User = new Schema({
    idCardNumber: { type: String, unique: true },
    name: { type: String },
    address: { type: String },
    dob: { type: Date },
    avatar: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    deleted: { type: Boolean },
    deletedAt: { type: String },
    // accountId: { type: Schema.Types.ObjectId, ref: 'Account' },
});

User.plugin(
    mongoose_delete,
    { overrideMethods: 'all' },
    { indexFields: ['deletedAt'] }
);

module.exports = mongoose.model('User', User);
