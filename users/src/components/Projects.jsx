import React, { useEffect, useState } from "react";
import axios from "axios";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  const getdata = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACK_URL}/projects`);
      setProjects(res.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <section id="projects">
      <h2 className="section-title">My Projects</h2>
      <div className="projects-grid">
        {projects.map((project, idx) => (
          <div className="project-card" key={idx}>
            <div className="project-image">
              <img src={project.image} alt={project.title} />
            </div>
            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-buttons">
                <button
                  className="project-button"
                  onClick={() => window.open(project.liveLink)}
                >
                  View Project
                </button>
                <button
                  className="project-button"
                  onClick={() => window.open(project.githubLink)}
                >
                  Source Code
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
