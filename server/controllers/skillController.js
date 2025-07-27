const Skill = require("../models/skill");

// Create
exports.createSkill = async (req, res) => {
    try {
        const { title, icon, color, skills } = req.body;
        console.log("Creating skill:", req.body);

        const skill = await Skill.create({
            title,
            icon,
            color,
            skills
        });

        res.status(201).json({ msg: "Skill created", skill });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Read
exports.getSkills = async (req, res) => {
    try {
        const skills = await Skill.find().sort({ createdAt: -1 });
        res.json(skills);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Delete
exports.deleteSkill = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (!skill) return res.status(404).json({ msg: "Skill not found" });

        await Skill.findByIdAndDelete(req.params.id);

        res.json({ msg: "Skill deleted" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Update
exports.updateSkill = async (req, res) => {
    try {
        const { title, icon, color, skills } = req.body;

        const category = await Skill.findById(req.params.id);
        if (!category) return res.status(404).json({ msg: "Skill (category) not found" });

        category.title = title || category.title;
        category.icon = icon || category.icon;
        category.color = color || category.color;

        if (Array.isArray(skills)) {
            category.skills = skills;
        }

        await category.save();
        res.json({ msg: "Skill (category) updated", category });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

