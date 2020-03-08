const express = require("express");
const Status = require("../models/status.model");
const router = express.Router();

router.get("/getAll", async (req,res) =>{
    try {
        let status = await Status.find();
        res.status(200).json({status})
    } catch (error) {
        res.status(500).json({error, event:'Internal Error Server'})        
    }
});

router.post("/newStatus", async (req,res) =>{
    try {
        let status = new Status({
            title:req.body.title,
            description:req.body.description
        })
        await status.save();
        res.status(200).json({event:'Status created', status})
    } catch (error) {
        res.status(500).json({error, event:'Internal Error Server'})        
    }
});

module.exports = router