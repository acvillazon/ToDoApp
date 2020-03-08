var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../config').config();

exports.ensureAuthenticated = function(req, res, next) {
  if(!req.headers.authorization) {
    return res
      .status(403)
      .json({message: "The request not contains authorization's header"});
  }
  
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