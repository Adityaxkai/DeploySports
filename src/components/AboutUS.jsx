import React from 'react';
import './AboutUS.css';
import "bootstrap/dist/css/bootstrap.min.css";

export const AboutUs = () => {
  return (
    <section className="about-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="about-content">
              <h2 className="section-title">About Us</h2>
              <p className="about-description">
                Founded in 1938, Bijoy Institute has been at the forefront of badminton excellence for over eight decades. 
                We are dedicated to promoting excellence through world-class coaching, state-of-the-art facilities, 
                and community engagement.
              </p>
              <p className="about-description">
                Our mission is to provide opportunities for growth, skill development, and meaningful connections 
                among our members. Whether you're a seasoned player or just starting your badminton journey, 
                we're excited to have you as part of our legacy.
              </p>
              <div className="about-features">
                <div className="feature-item">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Professional coaching staff</span>
                </div>
                <div className="feature-item">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>World-class facilities</span>
                </div>
                <div className="feature-item">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Regular tournaments</span>
                </div>
                <div className="feature-item">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Community building</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about-image">
              <img 
                src="assets/images/gallery4.jpg" 
                alt="Bijoy Institute History" 
                className="img-fluid rounded"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/600x400/f8f9fa/6c757d?text=Sports+Club+History';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
