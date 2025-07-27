const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {createSkill,getSkills,deleteSkill,updateSkill,} = require("../controllers/skillController");



router.get("/skills", getSkills);

router.post("/skills", auth, createSkill);

router.delete("/skills/:id", auth, deleteSkill);

router.put("/skills/:id", auth, updateSkill);



module.exports = router;
