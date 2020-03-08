const md5 = require('md5');
const Auth = require("../models/auth.model");
const User = require("../models/user.model");
const validate = require("../bin/validate")
const userFun = require('../controllers/user.controller');
const HASH = require("../config").HASH_TOKEN;

exports.login = async (req,res) =>{
    try {
        let auth = await Auth.findOne({email:req.body.email.toLowerCase()});
        if (!auth) return res.status(404).json({event:'User not found'}); 
        if(auth.password===md5(req.body.password.concat(HASH))){
            res.status(200).json({
                event:'Sucessfull authentication',
                idToken:validate.createToken(auth)
            });
        }else{ 
            res.status(404).json({event:'Incorrect Password'});
        }
        
    } catch (error) {
        res.status(500).json({event:'Internal Server Error', error});
    }
};

exports.register = async (req,res) =>{    
    try {
        let response = await userFun.createUser(req); 
               
        if(response){
            let auth = new Auth({
                email:req.body.email.toLowerCase(),
                password:md5(req.body.password.concat(HASH)),
                user:response
            })
    
            auth.save()
                .then((data) => res.status(200).json({event:'User created', idToken:validate.createToken(data)}))
        }else{
            res.status(500).json({event:'User not created'});
        }     
    } catch (error) {
        res.status(500).json({event:'Internal Server Error', error});
    }
};