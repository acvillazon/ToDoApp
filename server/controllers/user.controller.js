let User = require("../models/user.model");

exports.getUsers = async (req,res) =>{
    try {
        let Users = await User.find();
        res.status(200).json({Users}); 
    } catch (error) {
        res.status(500).json({event:'Internal Error Server',error});
    }
};

exports.createUser = async (req) =>{
    try {
        let user = new User({
            name:req.body.name,
            username:req.body.username,
            email:req.body.email.toLowerCase()
        });
        await user.save();
        return user;
    } catch (error) {
        return false;
    }
};

exports.getUser = async (req,res) =>{
    try {
        let user = await User.findById(req.body._id);
        res.status(200).json({user}); 
    } catch (error) {
        res.status(500).json({event:'Internal Error Server',error});
    }
};