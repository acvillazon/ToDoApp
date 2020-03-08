const Lista = require("../models/list.model");
exports.createList = async (req,res) =>{
    try {
        let List = new Lista(
            {
                tittle:req.body.tittle,
                dashboard:req.body.dashboard
            }
        );
        await List.save();
        res.status(200).json({List, event:'List created'});
    } catch (error) {
        console.log(error)
        res.status(500).json({event:'Internal Error Server', error});        
    }
};

exports.getAllInDash = async (req,res) =>{
    try {
        let tasks = await Lista.find({dashboard:req.params.id})
        res.status(200).json({tasks})
    } catch (error) {
        res.status(500).json({event:'Internal Error Server', error});        
    }
};

exports.updateList = async (req,res) =>{
    try {
        let task = await Lista.findByIdAndUpdate(req.body.List_id, {$set:req.body.list}, {new:true});
        res.status(200).json({task, event:'List upated'});
    } catch (error) {
        res.status(500).json({event:'Internal Error Server', error});        
    }
};

exports.deleteList = async (req,res) =>{
    try {
        let task = await Lista.findOneAndDelete(req.body.List_id)
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({event:'Internal Error Server', error});        
    }
};