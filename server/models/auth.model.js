const mongoose = require('mongoose');
const User = require("./user.model");
const { Schema } = mongoose;

const authSchema = new Schema({
    email: { type: String, required: true, unique:true},
    password: { type: String, required: true },
    user:{type:Schema.Types.ObjectId, ref:'User'}
});

module.exports = mongoose.model('Auth', authSchema);