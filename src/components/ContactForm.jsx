import React, { useState } from 'react';
import './ContactForm.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Validate from './ValidationContact';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = Validate(formData);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/contacts/submit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message
          }),
        });
  
        const data = await response.json();
        
        if (response.ok) {
          setMessage('Message sent successfully!');
          setFormData({ name: '', email: '', message: '' });
          setErrors({});
        } else {
          // Handle server validation errors
          setErrors({ submit: data.message || 'Please Try After Sometime' });
        }
      } catch (error) {
        setErrors({ submit: 'Network error. Please try again.' + error });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <section className="contact-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="contact-container">
              <h2 className="section-title">Contact Us</h2>
              <p className="section-subtitle">Get in touch with us for any inquiries or feedback</p>
              
              {message && (
                <div className="alert alert-success contact-alert">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  {message}
                </div>
              )}
              
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email address"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="Enter your message here..."
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className={`form-control ${errors.message ? "is-invalid" : ""}`}
                  ></textarea>
                  {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                </div>

                {errors.submit && (
                  <div className="alert alert-danger contact-alert">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {errors.submit}
                  </div>
                )}

                <button 
                  type="submit" 
                  className={`contact-btn ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-send me-2"></i>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
