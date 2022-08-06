const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Status = new Schema({
    statusId: { type: String },
    statusName: { type: String },
});

module.exports = Schema.model('Status', Status);
