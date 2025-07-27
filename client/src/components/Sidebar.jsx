import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={closeSidebar}></div>
            <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>
                <h2 className="sidebar-title">My Portfolio</h2>
                <ul className="sidebar-list">
                    <li className="star-skills">
                        <Link to="/dashboard" onClick={closeSidebar}>Dashboard</Link>
                    </li>
                    <li className="star-skills">
                        <Link to="/manage-skills" onClick={closeSidebar}>Manage Skills</Link>
                    </li>
                    <li className="star-projects">
                        <Link to="/manage-projects" onClick={closeSidebar}>Manage Projects</Link>
                    </li>
                    <li className="star-update">
                        <Link to="/manage-user" onClick={closeSidebar}>Update User</Link>
                    </li>
                </ul>
            </div>
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                ☰
            </button>
        </>
    );
}
