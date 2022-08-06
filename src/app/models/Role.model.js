const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Role = new Schema({
    roleId: {type: String},
    roleName: {type: String},
})

module.exports = mongoose.model('Role', Role)