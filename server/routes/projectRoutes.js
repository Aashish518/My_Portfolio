const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const {createProject,getProjects,deleteProject,updateProject} = require("../controllers/projectController");



router.get("/projects", getProjects);

router.post("/projects", auth, upload.single("image"), createProject);

router.delete("/projects/:id", auth, deleteProject);

router.put("/projects/:id", auth, upload.single("image"), updateProject);



module.exports = router;
