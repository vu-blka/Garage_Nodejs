const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;

const Cart = new Schema({
    cartId: { type: String, unique: true },
    createAt: { type: Date },
    totalPrice: { type: Number },
    statusId: { type: Schema.Types.ObjectId, ref: 'Status' },
    idUser: { type: Schema.Types.ObjectId, ref: 'User' },
    // shipperEmployeeId: {type: Schema.Types.ObjectId, ref: 'Employee' },
    // browseEmployeeId: {type: Schema.Types.ObjectId, ref: 'Employee' },
    deleted: { type: Boolean },
    deletedAt: { type: String },
});

Cart.plugin(
    mongoose_delete,
    { overrideMethods: 'all' },
    { indexFields: ['deletedAt'] }
);

module.exports = mongoose.model('Cart', Cart);
