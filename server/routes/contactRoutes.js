const express = require("express");
const auth = require("../middleware/auth");
const { addContact, getAllContacts, deleteContact } = require("../controllers/contactController");
const router = express.Router();

router.post("/contact", addContact);

router.get("/contact",auth,getAllContacts);

router.delete("/contact/:id",auth,deleteContact);

module.exports = router;
