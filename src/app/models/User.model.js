const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    idCardNumber: { type: String, unique: true },
    name: { type: String },
    address: { type: String },
    dob: { type: Date },
    avatar: {type: String},
    email: { type: String },
    phoneNumber: { type: String },
    account: { type: Schema.Types.ObjectId, ref: 'Account' },
});

module.exports = mongoose.model('User', User);
