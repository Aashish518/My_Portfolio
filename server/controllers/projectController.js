const Project = require("../models/Project");


exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 }); // newest first
        res.status(200).json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error.message);
        res.status(500).json({ message: "Failed to get projects" });
    }
};


// POST /projects
exports.createProject = async (req, res) => {
    try {
        const { title, description, liveLink, githubLink } = req.body;

        if (!req.file || !req.file.path) {
            return res.status(400).json({ message: "Image is required" });
        }

        const image = req.file.path;

        const newProject = new Project({
            title,
            description,
            liveLink,
            githubLink,
            image,
        });

        await newProject.save();
        res.status(201).json({ message: "Project created successfully", project: newProject });
    } catch (error) {
        console.error("Project creation error:", error.message);
        res.status(500).json({ message: "Failed to create project" });
    }
};

exports.updateProject = async (req, res) => {
    try {
        const { title, description, liveLink, githubLink } = req.body;
        const image = req.file?.path;

        const updatedFields = {
            ...(title && { title }),
            ...(description && { description }),
            ...(liveLink && { liveLink }),
            ...(githubLink && { githubLink }),
            ...(image && { image }),
        };

        const updated = await Project.findByIdAndUpdate(
            req.params.id,
            updatedFields,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.json({ message: "Project updated", project: updated });
    } catch (err) {
        res.status(500).json({ message: "Failed to update project" });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        await project.deleteOne();
        res.status(200).json({ message: "Project deleted successfully" });

    } catch (error) {
        console.error("Delete error:", error.message);
        res.status(500).json({ message: "Failed to delete project" });
    }
};
