const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
    tittle:{type:String, required:true},
    description:{type:String},
    deadline:{type:Date},
    assignedTo:[{type:Schema.Types.ObjectId, ref:'User'}],
    list:{type:Schema.Types.ObjectId, ref:'List', required:true},
    dashboard:{type:Schema.Types.ObjectId, ref:'Dashboard'},
    status:{type:Number, required:true}
});

module.exports = mongoose.model('Task', taskSchema);