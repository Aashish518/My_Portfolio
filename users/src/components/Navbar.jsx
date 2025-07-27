import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleNavbar = () => setIsOpen(!isOpen);
  const closeNavbar = () => setIsOpen(false);

  return (
    <nav className={`navbar-outer ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar">
        <div className="navbar-logo">
          <span className="logo-text">AJ</span>
          <div className="logo-dot"></div>
        </div>

        <button className={`toggle-button ${isOpen ? 'active' : ''}`} onClick={toggleNavbar}>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <ul className={`navbar-links ${isOpen ? "active" : ""}`}>
          <li><a href="#home" onClick={closeNavbar} className="nav-link">Home</a></li>
          <li><a href="#about" onClick={closeNavbar} className="nav-link">About</a></li>
          <li><a href="#skills" onClick={closeNavbar} className="nav-link">Skills</a></li>
          <li><a href="#experience" onClick={closeNavbar} className="nav-link">Experience</a></li>
          <li><a href="#projects" onClick={closeNavbar} className="nav-link">Projects</a></li>
          <li><a href="#contact" onClick={closeNavbar} className="nav-link">Contact</a></li>
          <li><a href={import.meta.env.VITE_ADMIN_URL} onClick={closeNavbar} className="nav-link admin-btn">Admin</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
