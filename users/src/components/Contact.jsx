import React from "react";
import { useState } from "react";
import axios from "axios";


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    message: "",
  });

 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BACK_URL}/contact`, formData);
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", mobileNo: "", message: "" });
    } catch (error) {
      alert("Error sending message.");
    }
  };


  return (
    <section id="contact">
      <h2 className="section-title">Get In Touch</h2>
      <div className="contact-container">
        <div className="contact-info">
          <p>I’m always open to new opportunities, meaningful collaborations, or connecting with like-minded professionals. If you’re looking for a passionate developer or have an exciting project in mind, feel free to get in touch — I’d love to hear from you.</p>
          <div className="contact-details">
            <div className="contact-item">
              <div className="contact-icon">📧</div>
              <div className="contact-text">
                <h3>Email</h3>
                <p>jadavaashish9@gmail.com</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📱</div>
              <div className="contact-text">
                <h3>Phone</h3>
                <p>+91 6355831203</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">🏢</div>
              <div className="contact-text">
                <h3>Address</h3>
                <p>juna vadaj, Ahmedabad</p>
              </div>
            </div>
          </div>
          <div className="contact-social-links">
            <button onClick={() => window.open("https://github.com/Aashish518")} className="contact-social-link">GitHub</button>
            <button onClick={() => window.open("https://www.linkedin.com/in/jadavaashish")} className="contact-social-link">LinkedIn</button>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form-group">
            <label>Name</label>
            <input id="name" type="text" className="contact-form-control" required value={formData.name} onChange={handleChange} />
          </div>
          <div className="contact-form-group">
            <label>Email</label>
            <input id="email" type="email" className="contact-form-control" required value={formData.email} onChange={handleChange} />
          </div>
          <div className="contact-form-group">
            <label>Mobile No</label>
            <input id="mobileNo" type="text" className="contact-form-control" required value={formData.mobileNo} onChange={handleChange} />
          </div>
          <div className="contact-form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" className="contact-form-control" required value={formData.message} onChange={handleChange}></textarea>
          </div>
          <button type="submit" className="contact-submit-btn">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
