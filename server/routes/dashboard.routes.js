const express = require("express");
const router = express.Router();
const dashCntr = require("../controllers/dashboard.controller")

router.get("/getAll", dashCntr.getDashboards);

router.get("/getDash/:id", dashCntr.getDashboard);

router.post("/new", dashCntr.newDashboard);

router.put("/update", dashCntr.updateDashboard);

// Get all dashboards of one especified user;
router.get("/getInUser", dashCntr.getDashboardInUser);

//Add a new user to a especified dashboard, only the users here could see the content
router.put("/addMember", dashCntr.addMembersToDashboard); 

//Remove a user of a especified dashboard.
router.put("/removeMember", dashCntr.removeMembersToDashboard); 

//Remove a especified dashboard.
router.delete("/remove/:id", dashCntr.removeDashboard); 
module.exports = router