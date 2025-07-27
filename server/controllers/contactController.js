
const Contact = require("../models/contact");

exports.addContact = async (req, res) => {
    try {
        const { name, email, mobileNo, message } = req.body;

        const newContact = new Contact({ name, email, mobileNo, message });
        await newContact.save();

        res.status(201).json({ success: true, data: newContact });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: contacts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteContact = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedContact = await Contact.findByIdAndDelete(id);

        if (!deletedContact) {
            return res.status(404).json({ success: false, message: "Contact not found" });
        }

        res.status(200).json({ success: true, message: "Contact deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
