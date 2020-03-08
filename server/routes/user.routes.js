const express = require("express");
const router = express.Router();
const userCntr = require("../controllers/user.controller")

router.get("/get/:id", userCntr.getUser);
router.get("/getAll", userCntr.getUsers);

module.exports = router