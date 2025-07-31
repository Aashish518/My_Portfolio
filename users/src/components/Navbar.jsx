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

  // Smooth scrolling function
  const smoothScrollTo = (e, targetId) => {
    e.preventDefault();
    closeNavbar();
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const navbarHeight = 80; // Approximate navbar height
      const targetPosition = targetElement.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

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
          <li><a href="#home" onClick={(e) => smoothScrollTo(e, '#home')} className="nav-link">Home</a></li>
          <li><a href="#about" onClick={(e) => smoothScrollTo(e, '#about')} className="nav-link">About</a></li>
          <li><a href="#skills" onClick={(e) => smoothScrollTo(e, '#skills')} className="nav-link">Skills</a></li>
          <li><a href="#experience" onClick={(e) => smoothScrollTo(e, '#experience')} className="nav-link">Experience</a></li>
          <li><a href="#projects" onClick={(e) => smoothScrollTo(e, '#projects')} className="nav-link">Projects</a></li>
          <li><a href="#contact" onClick={(e) => smoothScrollTo(e, '#contact')} className="nav-link">Contact</a></li>
          <li><a href={import.meta.env.VITE_ADMIN_URL} onClick={closeNavbar} className="nav-link admin-btn">Admin</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
