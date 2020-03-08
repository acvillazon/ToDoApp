
const mongoose = require('mongoose');
const { Schema } = mongoose;

const listSchema = new Schema({
    tittle:{type:String, required:true},
    dashboard:{type:Schema.Types.ObjectId, ref:'Dashboard', required:true},
});

module.exports = mongoose.model('List', listSchema);