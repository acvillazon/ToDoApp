var jwt = require('jwt-simple');
var moment = require('moment');
var config = require("../config").config();

// this function receive the id of the user who want to authenticate,
//build a token for him/her and return this token.

//The library that allow us to build and decode the TOKEN is jwt-simple
//https://www.npmjs.com/package/jwt-simple

exports.createToken = function(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(7, "days").unix(),
  };
    return jwt.encode(payload, config.TOKEN_SECRET);
};