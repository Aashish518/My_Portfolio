import React from "react";
import { Link } from "react-router-dom";

export const Sidebar=()=> {
    return (
        <div className="sidebar-container">
            <h2 className="sidebar-title">My Portfolio</h2>
            <ul className="sidebar-list">
                <li className="star-skills">
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="star-skills">
                    <Link to="/manage-skills">Manage Skills</Link>
                </li>
                <li className="star-projects">
                    <Link to="/manage-projects">Manage Projects</Link>
                </li>
                <li className="star-update">
                    <Link to="/manage-user">Update User</Link>
                </li>
            </ul>
        </div>
    );
}
