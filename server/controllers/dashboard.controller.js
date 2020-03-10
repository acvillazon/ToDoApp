const Dashboard = require("../models/dashboard.model");
const Auth = require("../models/auth.model");
const User = require("../models/user.model");

exports.getDashboards = async (req, res) =>{
    try {
        let dashboards = await Dashboard.find({status:true});
        res.status(200).json({dashboards})
    } catch (error) {
        res.status(500).json({event:'Internal Error Server', error});        
    }
};

exports.getDashboard = async (req, res) =>{
    try {
        let dashboard = await (await Dashboard.findOne({_id:req.params.id, status:true}).populate("members")).execPopulate();
        res.status(200).json({dashboard})
    } catch (error) {
        res.status(500).json({event:'Internal Error Server', error});        
    }
};

exports.getDashboardInUser = async (req, res) =>{
    try {
        let auth = await Auth.findById(req.id_user);

        let dashboards = await Dashboard.find({members:auth.user,status:true});

        res.status(200).json({dashboards, event:"getDash"})

    } catch (error) {
        res.status(500).json({event:'Internal Error Server', error});        
    }
};

exports.newDashboard = async (req, res) =>{
    try {
        let auth = await Auth.findById(req.id_user);

        let dashboard= new Dashboard({
            title:req.body.title,
            user:auth.user,
            members:[auth.user],
            status:true,
            creationDate:new Date().getTime()
        });
        await dashboard.save();

        res.status(200).json({dashboard, event:'Dashboard created'})
    } catch (error) {

        res.status(500).json({event:'Internal Error Server', error});        
    }
};

exports.updateDashboard = async (req, res) =>{
    try {
        const { id } = req.params;
        let dashboards = await Dashboard.findOneAndUpdate(id, 
            {$set:req.body.dash}, {new:true});
        res.status(200).json({dashboards})
    } catch (error) {
        res.status(500).json({event:'Internal Error Server', error});        
    }
};

exports.addMembersToDashboard = async (req, res) =>{
    try {

        let updateDash = await Dashboard.findByIdAndUpdate(req.body.idDash, 
            {$push:{members:req.body.idUser}});
        
        let dashboardUpdated = await (await Dashboard.findById(req.body.idDash)
            .populate("members")).execPopulate();
            
        res.status(200).json({dashboards:updateDash,dashboardUpdated})
    } catch (error) {
        res.status(500).json({event:'Internal Error Server', error});        
    }
};

exports.removeMembersToDashboard = async(req,res) =>{
    try {
        let dashboard = await Dashboard.findById(req.body.idDash);

        if(dashboard.user.toString()===req.body.idUser.toString()){
            res.status(200).json({status:300});
        }else{
            let members = dashboard.members.filter(data=> 
                data.toString()!=req.body.idUser.toString());
    
            
            
            let dashUpdated = await Dashboard
                .findOneAndUpdate({_id:req.body.idDash}, 
                    {$set:{members:members}},{new:true});
            
            let dashboardUpdated = await (await Dashboard.findById(req.body.idDash)
                .populate("members")).execPopulate();
    
            res.status(200).json({dashboard:dashUpdated,dashboardUpdated})
        }

    } catch (error) {
        res.status(500).json({event:'Internal Error Server', error});        
    }
}

exports.removeDashboard = async (req,res) =>{
    try {
        console.log(req.params.id);
        let a = await Dashboard.findByIdAndUpdate(
            req.params.id,{status:false},{new:true});

        console.log(a);
        res.status(200).json({Dashboard,event:"Dashboard was archivated"})
    } catch (error) {
        res.status(500).json({error})
        
    }
};