const express = require("express");
const router = express.Router();
const dashCntr = require("../controllers/dashboard.controller")

router.get("/getAll", dashCntr.getDashboards);
router.get("/getDash/:id", dashCntr.getDashboard);
router.post("/new", dashCntr.newDashboard);
router.put("/update", dashCntr.updateDashboard);

// Get all dashboards of one especified user;
router.get("/getInUser", dashCntr.getDashboardInUser);

//Add new users to the dashboard, only the users here could see the content;
router.put("/addMember", dashCntr.addMembersToDashboard); 

router.put("/removeMember", dashCntr.removeMembersToDashboard); 

module.exports = router