const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Description = new Schema({
    refId: { type: Schema.Types.ObjectId, ref: 'Service Product' },
    type: { type: String },
    content: { type: String },
});

module.exports = mongoose.model('Description', Description);
