const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Cart = new Schema({
    cartId: { type: Number, unique: true },
    createAt: { type: Date },
    totalPrice: { type: Number },
    statusId: { type: Schema.Types.ObjectId, ref: 'Status' },
    afterPrice: { type: Number },
    idUser: { type: Schema.Types.ObjectId, ref: 'User' },
    deleted: { type: Boolean },
    deletedAt: { type: String },
});

Cart.plugin(AutoIncrement, { inc_field: 'cartId' });
Cart.plugin(
    mongoose_delete,
    { overrideMethods: 'all' },
    { indexFields: ['deletedAt'] }
);

module.exports = mongoose.model('Cart', Cart);
