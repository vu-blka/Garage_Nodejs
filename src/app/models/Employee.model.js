const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Employee = new Schema({
    employeeId: { type: String },
    name: { type: String },
    dob: { type: Date },
    email: { type: String },
    phoneNumber: { type: String },
	address: {type: String},
    accountId: { type: Schema.Types.ObjectId, ref: 'Account' },
});

module.exports = mongoose.model('Employee', Employee);
