const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Account = new Schema({
    accountId: {type: String, unique: true},
    username: { type: String, unique: true },
    password: { type: String }, 
    role: { type: Schema.Types.ObjectId, ref: 'Role' },
})

module.exports = mongoose.model('Account', Account)