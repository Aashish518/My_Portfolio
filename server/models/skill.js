const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    logo: { type: String }
});

const categorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    icon: { type: String },
    color: { type: String },
    skills: [skillSchema]
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
