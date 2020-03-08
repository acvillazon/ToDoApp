const express = require("express");
const router = express.Router();
const authCntr = require("../controllers/auth.controller")

router.post("/login", authCntr.login);
router.post("/register", authCntr.register);

module.exports = router