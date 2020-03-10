var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../config').config();

///it's help us knowing if the request has a token authentication. 
//if it doesn't exists or it's expired, then the request cannot be executed.

//The library that allow us to build and decode the TOKEN is jwt-simple
//https://www.npmjs.com/package/jwt-simple

exports.ensureAuthenticated = function(req, res, next) {
  if(!req.headers.authorization) {
    return res
      .status(403)
      .json({message: "The request not contains authorization's header"});
  }
  
  // Bear {TOKEN}
  var token = req.headers.authorization.split(" ")[1];
  
  var payload = jwt.decode(token, config.TOKEN_SECRET);
  
  if(payload.exp <= moment().unix()) {
     return res
        .status(401)
        .json({message: "Token expired"});
  }
  
  req.id_user = payload.sub;
  next();
}