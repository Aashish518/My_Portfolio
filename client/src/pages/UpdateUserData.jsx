import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

const UpdateUser = () => {
    const token = localStorage.getItem("token");

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(
                `${import.meta.env.VITE_BACK_URL}/user`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            alert("User updated successfully");
            navigate("/dashboard");
        } catch (error) {
            console.error("Error updating user:", error.response?.data || error);
            alert("Update failed");
        }
    };


    return (
        <div>
            
            <Sidebar />
            <form className="update-userdata-form" onSubmit={handleSubmit}>
                <h2>Update User</h2>
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />

                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateUser;
