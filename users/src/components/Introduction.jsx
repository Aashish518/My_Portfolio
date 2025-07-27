import React from "react";

const Introduction = () => {
  return (
    <section id="home">
      <div className="home-content">
        <div className="home-hero-text">
          <h1 className="home-hero-title animate-title">Hi, I'm Aashish</h1>
          <p className="home-hero-subtitle animate-subtitle">MERN Stack Developer</p>
          <a href="/Aashish CV.pdf" download="Aashish_Resume.pdf" className="home-hero-button animate-button">Download Resume</a>
        </div>
        <div className="home-hero-image animate-image">
          <div className="image-container">
            <img src="Aashish-imge.jpg" alt="Aashish" />
            <div className="image-overlay"></div>
            <div className="floating-elements">
              <div className="floating-dot dot-1"></div>
              <div className="floating-dot dot-2"></div>
              <div className="floating-dot dot-3"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
