const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Status = new Schema({
    statusId: { type: Number, unique: true },
    statusName: { type: String },
});

module.exports = mongoose.model('Status', Status);
