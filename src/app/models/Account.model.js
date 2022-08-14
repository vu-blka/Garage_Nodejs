const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const connection = mongoose.createConnection(
    'mongodb://localhost:27017/TTTN_garage'
);

autoIncrement.initialize(connection);

const Account = new Schema({
    accountId: { type: String, unique: true },
    username: { type: String, unique: true },
    password: { type: String },
    role: { type: Schema.Types.ObjectId, ref: 'Role' },
});

Account.plugin(autoIncrement.plugin, { model: 'Account', field: 'accountId' });

module.exports = mongoose.model('Account', Account);
