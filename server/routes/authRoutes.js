const express = require("express");
const router = express.Router();
const auth=require("../middleware/auth")
const { login, updateUser, getSingleUser } = require("../controllers/authController");



router.post("/login", login);

router.put("/user", auth, updateUser);

router.get("/user", auth,getSingleUser);



module.exports = router;
