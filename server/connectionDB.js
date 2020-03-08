const mongoose = require("mongoose");
const config = require("./config").config();

let URI_CONNECTION = `
    mongodb://${config.USER}:${config.DB_PASSWORD}@ds147723.mlab.com:47723/${config.DB_NAME}`;

mongoose.connect(URI_CONNECTION, {useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false})
    .then(db => console.log('db is connected'))
    .catch(err => console.error(err));

mongoose.set('useCreateIndex', true);

module.exports = mongoose;