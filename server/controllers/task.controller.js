const Task = require("../models/task.model");
const {_groupBy} = require("../bin/groupBy");
const Auth = require("../models/auth.model");

exports.getAll = async (req,res) =>{
    try {
        let task = await Task.find({dashboard:req.params.id, status: { $lte: 2 }}).populate("assignedTo").exec();
        let taskMod = _groupBy(task, task => task.list);      
        res.status(200).json({task, taskMod:Array.from(taskMod)});
    } catch (error) {
        res.status(500).json({event:'Internal Error Server'});
    }
};

exports.getAllInUser = async (req,res) =>{
    try {
        let tasks = await Task.find({user:req.body.userId});
        res.status(200).json({tasks});
        
    } catch (error) {
        res.status(500).json({event:'Internal Error Server'});
    }
};

exports.getTask = async (req,res) =>{
    try {
        let task = await Task.findOne(req.body._id);
        res.status(200).json({task});
        
    } catch (error) {
        res.status(500).json({event:'Internal Error Server'});
    }
};

exports.newTask = async (req,res) =>{
    try {
        
        let auth = await Auth.findById(req.id_user);
       
        req.body.Task.assignedTo=[auth.user];
        req.body.Task.status=0;

        let task = new Task(req.body.Task);
        await task.save()

        let tasksUpdated = await Task.find({dashboard:req.body.dashboard, status: { $lte: 2 }})
            .populate("assignedTo").exec();
        let taskMod = _groupBy(tasksUpdated, task => task.list); 

        res.status(200).json({task:tasksUpdated, taskMod:Array.from(taskMod), taskNew:task, event:'Task created'});
        
    } catch (error) {
        res.status(500).json({event:'Internal Error Server'});
    }
};

exports.updateTaskAll = async (req,res) =>{
    try {
        let taskReq=req.body.Task;
        let taskChange = {
            status:      Number(taskReq.status),
            description: taskReq.description,
            list: taskReq.list
        }
        let task = await (await Task.findOneAndUpdate({_id:taskReq._id}, {$set:taskChange},{new:true}).populate('assignedTo')).execPopulate();

        let tasksUpdated = await Task.find({dashboard:req.body.dashboard, status: { $lte: 2 }})
            .populate("assignedTo").exec();
        let taskMod = _groupBy(tasksUpdated, task => task.list); 

        res.status(200).json({task:tasksUpdated, taskMod:Array.from(taskMod), taskNew:task, event:'Task updated'});        
    } catch (error) {
        res.status(500).json({event:'Internal Error Server'});
    }
};

exports.addMemberToTask = async (req,res) =>{
    try {
        let task = await Task.findByIdAndUpdate(req.body.idTask, 
            {$push:{assignedTo:req.body.Task}});   

        let tasksUpdated = await Task.find({dashboard:req.body.dashboard, status: { $lte: 2 }})
            .populate("assignedTo").exec();
        let taskMod = _groupBy(tasksUpdated, task => task.list); 
        
        res.status(200).json({task:tasksUpdated, taskMod:Array.from(taskMod), taskNew:task, event:'Member updated'});
        } catch (error) {
        res.status(500).json({event:'Internal Error Server', error});        
    }
};

exports.removeMemberToTask = async (req,res) =>{
    try {
        let task = await Task.findById(req.body.idTask);

        let taskNew = task.assignedTo.filter(data=> 
            data.toString()!=req.body.User._id.toString());

        let newtask = await Task.findOneAndUpdate({_id:req.body.idTask}, {$set:{assignedTo:taskNew}},{new:true});

        let tasksUpdated = await Task.find({dashboard:req.body.dashboard, status: { $lte: 2 }})
            .populate("assignedTo").exec();
        let taskMod = _groupBy(tasksUpdated, task => task.list); 

        res.status(200).json({task:tasksUpdated, taskMod:Array.from(taskMod), taskNew:newtask, event:"Member deleted"})
    } catch (error) {
        res.status(500).json({event:'Internal Error Server', error});        
    }
};
