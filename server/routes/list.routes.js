const express = require("express");
const router = express.Router();
const ListCntr = require("../controllers/list.controller");

router.post("/new", ListCntr.createList);
router.put("/update/:id", ListCntr.updateList);
router.delete("/delete/:id", ListCntr.deleteList);

// Get all List of a especified Dashboard;
router.get("/getAll/:id", ListCntr.getAllInDash);

module.exports = router