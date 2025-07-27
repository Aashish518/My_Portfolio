import React, { useState, useEffect } from "react";
import axios from "axios";
import {Sidebar} from "../components/Sidebar";

const ManageProjects = () => {
    const token = localStorage.getItem("token");

    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        liveLink: "",
        githubLink: "",
    });
    const [imageFile, setImageFile] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [editId, setEditId] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    const fetchProjects = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACK_URL}/projects`);
            setProjects(res.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
            setErrorMsg("Failed to fetch projects.");
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const resetForm = () => {
        setFormData({ title: "", description: "", liveLink: "", githubLink: "" });
        setImageFile(null);
        setEditId(null);
        setShowPopup(false);
        setErrorMsg("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("liveLink", formData.liveLink);
        data.append("githubLink", formData.githubLink);
        if (imageFile) data.append("image", imageFile);

        try {
            if (editId) {
                await axios.put(`${import.meta.env.VITE_BACK_URL}/projects/${editId}`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                });
            } else {
                await axios.post(`${import.meta.env.VITE_BACK_URL}/projects`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                });
            }

            fetchProjects();
            resetForm();
        } catch (error) {
            console.error("Error saving project:", error);
            setErrorMsg("Failed to save project.");
        }
    };

    const handleUpdate = (project) => {
        setFormData({
            title: project.title,
            description: project.description,
            liveLink: project.liveLink,
            githubLink: project.githubLink,
        });
        setEditId(project._id);
        setImageFile(null);
        setShowPopup(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACK_URL}/projects/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchProjects();
        } catch (error) {
            console.error("Error deleting project:", error);
            setErrorMsg("Failed to delete project.");
        }
    };

    return (
        <div className="manage-project-container">
            <Sidebar />
            <h1 className="heading">Manage Projects</h1>

            {errorMsg && <p className="error-message">{errorMsg}</p>}

            <button
                className="add-btn"
                onClick={() => {
                    resetForm();
                    setShowPopup(true);
                }}
            >
                + Add Project
            </button>

            <div className="project-card-container">
                {Array.isArray(projects) &&
                    projects.map((project) => (
                        <div className="project-card" key={project._id}>
                            <img
                                src={
                                    project.image.startsWith("http")
                                        ? project.image
                                        : `${import.meta.env.VITE_BACK_URL}/${project.image}`
                                }
                                alt={project.title}
                                className="project-img"
                            />
                            <h3 className="project-title">{project.title}</h3>
                            <p className="project-desc">{project.description}</p>
                            <div className="project-links">
                                <a href={project.liveLink} target="_blank" rel="noreferrer">Live</a> |{" "}
                                <a href={project.githubLink} target="_blank" rel="noreferrer">GitHub</a>
                            </div>
                            <div className="card-actions">
                                <button className="btn update-btn" onClick={() => handleUpdate(project)}>Update</button>
                                <button className="btn delete-btn" onClick={() => handleDelete(project._id)}>Delete</button>
                            </div>
                        </div>
                    ))}
            </div>

            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-box">
                        <h2>{editId ? "Update Project" : "Add Project"}</h2>
                        <form onSubmit={handleSubmit} className="popup-form" encType="multipart/form-data">
                            <input
                                type="text"
                                name="title"
                                placeholder="Project Title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                            <textarea
                                name="description"
                                placeholder="Project Description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="url"
                                name="liveLink"
                                placeholder="Live Link"
                                value={formData.liveLink}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="url"
                                name="githubLink"
                                placeholder="GitHub Link"
                                value={formData.githubLink}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                required={!editId}
                            />
                            <div className="popup-actions">
                                <button type="submit" className="btn submit-btn">
                                    {editId ? "Update" : "Add"}
                                </button>
                                <button
                                    type="button"
                                    className="btn cancel-btn"
                                    onClick={resetForm}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageProjects;
