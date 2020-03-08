const mongoose = require('mongoose');
const User = mongoose.model("User")
const { Schema } = mongoose;

const dashboardSchema = new Schema({
    title:{type:String, required:true}, 
    user:{type:Schema.Types.ObjectId, ref:'User', required:true},
    members:[{type:Schema.Types.ObjectId, ref:'User' , required:true}],
    status:{type:Boolean},
    creationDate:{type:Date}
});

module.exports = mongoose.model('Dashboard', dashboardSchema);