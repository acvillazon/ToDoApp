exports.config = function() {
    var envJSON = require("./env.variables.json");
    var node_env = process.env.NODE_ENV || "development";
    return envJSON[node_env];
}

exports.URI_CONNECTION = `
    mongodb://${this.config.USER}:${this.config.DB_PASSWORD}
        @ds147723.mlab.com:47723/${this.config.DB_NAME}`;