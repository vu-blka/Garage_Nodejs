const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Account = new Schema({
    accountId: { type: Number, unique: true },
    username: { type: String, unique: true },
    password: { type: String },
    role: { type: Schema.Types.ObjectId, ref: 'Role' },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
});

Account.plugin(AutoIncrement, { inc_field: 'accountId' });

Account.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

Account.methods.comparePassword = async function (password) {
    if (!password) res.status(401).send('Missing password');

    try {
        const result = await bcrypt.compare(password, this.password);
        return result;
    } catch (error) {
        console.log('Error while comparing password' + error.message);
    }
};

module.exports = mongoose.model('Account', Account);
