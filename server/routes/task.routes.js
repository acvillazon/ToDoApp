const express = require("express");
const router = express.Router();
const taskhCntr = require("../controllers/task.controller")

router.post('/new', taskhCntr.newTask);
router.put('/update', taskhCntr.updateTask);
router.put('/updateAll', taskhCntr.updateTaskAll);
router.get('/getTask/:id', taskhCntr.getTask);

//Add new members to a task, who will be responsible for it.
router.put('/addMember', taskhCntr.addMemberToTask);

router.put('/removeMember', taskhCntr.removeMemberToTask);

//Get all tasks of a dashboard
router.get('/getAll/:id', taskhCntr.getAll);

//Get all tasks of a user
router.get('/getAll/user/:user', taskhCntr.getAllInUser);

module.exports = router