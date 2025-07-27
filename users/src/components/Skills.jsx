import React, { useState, useEffect } from "react";
import axios from "axios";


const Skills = () => {
  const [skillCategories, setSkillCategories] = useState([]);

  const fetchSkills = async () => {
          try {
              const res = await axios.get(`${import.meta.env.VITE_BACK_URL}/skills`);
            setSkillCategories(res.data);
          } catch (error) {
              console.error("Error fetching skills:", error);
          }
      };

  useEffect(() => {
    fetchSkills();
  }, []);

  const [activeCategory, setActiveCategory] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );


    
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      observer.observe(skillsSection);
    }

    return () => observer.disconnect();
  }, []);

  
  return (
    <section id="skills" className={`skills-section ${isVisible ? 'visible' : ''}`}>
      <h2 className="section-title animate-title">My Skills</h2>
      <div className="skills-container">
        {Object.entries(skillCategories).map(([key, category], categoryIndex) => (
          <div 
            className={`skill-category ${activeCategory === key ? 'active' : ''}`} 
            key={key}
            style={{ animationDelay: `${categoryIndex * 0.2}s` }}
            onMouseEnter={() => setActiveCategory(key)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <div 
              className="category-header"
              style={{ '--category-color': category.color }}
            >
              <span className="category-icon animate-icon">{category.icon}</span>
              <h3 className="category-title">{category.title}</h3>
            </div>
            <div className="skills-grid">
              {category.skills.map((skill, idx) => (
                <div 
                  className={`skill-item ${hoveredSkill === `${key}-${idx}` ? 'hovered' : ''}`}
                  key={idx}
                  style={{ animationDelay: `${(categoryIndex * 0.2) + (idx * 0.1)}s` }}
                  onMouseEnter={() => setHoveredSkill(`${key}-${idx}`)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className="skill-content">
                    <span className="skill-logo animate-logo">{skill.logo}</span>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                  <div className="skill-glow"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
