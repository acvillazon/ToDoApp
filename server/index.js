const express = require("express");
const bodyParser = require('body-parser')
const compression = require('compression');
const cors = require('cors');
const http = require('http')
const middleware = require("./bin/authenticated");
var config = require('./config').config()
const app = new express();

const {Mongoose} = require("./connectionDB");

//Settings
app.set("PORT",process.env.PORT || config.PORT);

// Middlewares (DEV ANGULAR)
app.use(cors({origin: 'http://localhost:4200'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(compression())

//ROUTES
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/dashboard",middleware.ensureAuthenticated,require("./routes/dashboard.routes"));
app.use("/api/list", middleware.ensureAuthenticated, require("./routes/list.routes"));
app.use("/api/task", middleware.ensureAuthenticated,require("./routes/task.routes"));
app.use("/api/status", middleware.ensureAuthenticated, require("./routes/status.routes"));

app.get("/api/privated", middleware.ensureAuthenticated, (req,res)=>{
    res.json({authentication:true, id_:req.id_user}); 
});

/// PATH DEFAULT
app.use('*', function (req, res) {
    return res.status(404).send('Not Found');
});

const server = http.createServer(app);
server.listen(app.get("PORT"), () =>{
    console.log("Server running on PORT", app.get("PORT"))
});