import React, { useState, useEffect } from "react";
import axios from "axios";
import { Sidebar } from "../components/Sidebar";

const ManageSkills = () => {
    const token = localStorage.getItem("token");

    const [skills, setSkills] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        icon: "",
        color: "",
        skills: [{ name: "", logo: "" }],
    });
    const [showPopup, setShowPopup] = useState(false);
    const [editId, setEditId] = useState(null);

    const fetchSkills = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACK_URL}/skills`);
            setSkills(res.data);
        } catch (error) {
            console.error("Error fetching skills:", error);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSkillChange = (index, field, value) => {
        const updatedSkills = [...formData.skills];
        updatedSkills[index][field] = value;
        setFormData({ ...formData, skills: updatedSkills });
    };

    const addSkillInput = () => {
        setFormData({
            ...formData,
            skills: [...formData.skills, { name: "", logo: "" }],
        });
    };

    const removeSkillInput = (index) => {
        const updatedSkills = formData.skills.filter((_, i) => i !== index);
        setFormData({ ...formData, skills: updatedSkills });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await axios.put(`${import.meta.env.VITE_BACK_URL}/skills/${editId}`, formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } else {
                {console.log("Form Data:", token)}
                await axios.post(`${import.meta.env.VITE_BACK_URL}/skills`, formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }

            fetchSkills();
            setShowPopup(false);
            setEditId(null);
        } catch (error) {
            console.error("Error saving skill category:", error);
        }
    };

    const handleUpdate = (skillCategory) => {
        setFormData({
            title: skillCategory.title,
            icon: skillCategory.icon,
            color: skillCategory.color,
            skills: skillCategory.skills,
        });
        setEditId(skillCategory._id);
        setShowPopup(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACK_URL}/skills/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchSkills();
        } catch (error) {
            console.error("Error deleting skill category:", error);
        }
    };

    return (
        <div className="manage-skill-container">
            <Sidebar />
            <h1 className="heading">Manage Skill Categories</h1>

            <button
                className="add-btn"
                onClick={() => {
                    setFormData({
                        title: "",
                        icon: "",
                        color: "",
                        skills: [{ name: "", logo: "" }],
                    });
                    setEditId(null);
                    setShowPopup(true);
                }}
            >
                + Add Skill Category
            </button>

            <div className="skill-card-container">
                {Array.isArray(skills) &&
                    skills.map((category) => (
                        <div className="skill-card" key={category._id}>
                            <h3 className="skill-title">
                                {category.icon} {category.title}
                            </h3>
                            <p className="skill-category">Color: {category.color}</p>
                            <ul className="skill-list">
                                {category.skills.map((skill, idx) => (
                                    <li key={idx}>
                                        {skill.logo} {skill.name}
                                    </li>
                                ))}
                            </ul>
                            <div className="card-actions">
                                <button
                                    className="btn update-btn"
                                    onClick={() => handleUpdate(category)}
                                >
                                    Update
                                </button>
                                <button
                                    className="btn delete-btn"
                                    onClick={() => handleDelete(category._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
            </div>

            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-box">
                        <h2>{editId ? "Update Skill Category" : "Add Skill Category"}</h2>
                        <form onSubmit={handleSubmit} className="popup-form">
                            <input
                                type="text"
                                name="title"
                                placeholder="Category Title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="icon"
                                placeholder="Category Icon"
                                value={formData.icon}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="color"
                                placeholder="Color (e.g. #ff6b6b)"
                                value={formData.color}
                                onChange={handleChange}
                                required
                            />

                            <h4>Skills</h4>
                            {formData.skills.map((skill, index) => (
                                <div key={index} className="nested-skill-input">
                                    <input
                                        type="text"
                                        placeholder="Skill Name"
                                        value={skill.name}
                                        onChange={(e) =>
                                            handleSkillChange(index, "name", e.target.value)
                                        }
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Skill Logo"
                                        value={skill.logo}
                                        onChange={(e) =>
                                            handleSkillChange(index, "logo", e.target.value)
                                        }
                                        required
                                    />
                                    {formData.skills.length > 1 && (
                                        <button
                                            type="button"
                                            className="btn remove-skill-btn"
                                            onClick={() => removeSkillInput(index)}
                                        >
                                            ❌
                                        </button>
                                    )}
                                </div>
                            ))}

                            <button type="button" className="btn add-skill-btn" onClick={addSkillInput}>
                                + Add Skill
                            </button>

                            <div className="popup-actions">
                                <button type="submit" className="btn submit-btn">
                                    {editId ? "Update" : "Add"}
                                </button>
                                <button
                                    type="button"
                                    className="btn cancel-btn"
                                    onClick={() => {
                                        setShowPopup(false);
                                        setFormData({
                                            title: "",
                                            icon: "",
                                            color: "",
                                            skills: [{ name: "", logo: "" }],
                                        });
                                        setEditId(null);
                                    }}
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

export default ManageSkills;
