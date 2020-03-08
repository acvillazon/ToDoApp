
const mongoose = require('mongoose');
const { Schema } = mongoose;

const statusSchema = new Schema({
    tittle:{type:String, required:true},
    description:{type:String, required:true}
});

module.exports = mongoose.model('Status', statusSchema);