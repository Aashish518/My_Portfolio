import React, { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [userData, setUserData] = useState("");
    const [contactData, setContactData] = useState([]);

    const getUsername = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACK_URL}/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            setUserData(res.data.user.username);
        } catch (error) {
            console.error("Error getting user:", error.response?.data || error);
        }
    };

    const getContacts = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACK_URL}/contact`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            setContactData(res.data.data); 
        } catch (error) {
            console.error("Error fetching contacts:", error.response?.data || error);
        }
    };

    const deleteContact = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACK_URL}/contact/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setContactData((prev) => prev.filter((contact) => contact._id !== id));
        } catch (error) {
            console.error("Error deleting contact:", error.response?.data || error);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, [navigate, token]);

    useEffect(() => {
        getUsername();
        getContacts();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="dashboard">
            <Sidebar />
            <main className="dashboard-main">
                <header className="dashboard-header">
                    <h1 className="dashboard-welcome">Welcome, {userData}!</h1>
                    <button className="dashboard-logout" onClick={handleLogout}>
                        Logout
                    </button>
                </header>

                <section className="dashboard-contacts">
                    <h2 className="dashboard-contact-title">Contact Information</h2>
                    {Array.isArray(contactData) && contactData.length > 0 ? (
                        contactData.map((contact, index) => (
                            <div key={contact._id} className="dashboard-contact-card">
                                <p><strong>Name:</strong> {contact.name}</p>
                                <p><strong>Email:</strong> {contact.email}</p>
                                <p><strong>Mobile No:</strong> {contact.mobileNo}</p>
                                <p><strong>Message:</strong> {contact.message}</p>
                                <button onClick={() => deleteContact(contact._id)}>Delete</button>
                            </div>
                        ))
                    ) : (
                        <p>No contact data found.</p>
                    )}
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
