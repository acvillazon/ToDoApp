
const mongoose = require('mongoose');
const { Schema } = mongoose;

const listSchema = new Schema({
    tittle:{type:String, required:true},
    dashboard:{type:Schema.Types.ObjectId, ref:'Dashboard', required:true},
    status:{type:Boolean, required:true, default:true}
});

module.exports = mongoose.model('List', listSchema);