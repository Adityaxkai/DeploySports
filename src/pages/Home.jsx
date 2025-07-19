import React from "react";
import {useEffect} from "react";
import { ImageSlider } from "../components/ImageSlider";
import { Gallery } from "../components/Gallery";
import { AboutUs } from "../components/AboutUS";
import { ContactForm } from "../components/ContactForm";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Home.css";

export const Home = () => {

    useEffect(()=>{
        if(window.location.hash){
            const sectionId=window.location.hash.substring(1);
            const element=document.getElementById(sectionId);
            if(element){
                setTimeout(()=>{
                    element.scrollIntoView({behavior:'smooth'});
                },100);
            }
        }
    },[]);
    
  return (
    <div className="home-container">
      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <ImageSlider />
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="container">
            <div className="row text-center">
              <div className="col-md-3 col-6 mb-4">
                <div className="stat-item">
                  <i className="bi bi-people-fill stat-icon"></i>
                  <h3 className="stat-number">500+</h3>
                  <p className="stat-label">Active Members</p>
                </div>
              </div>
              <div className="col-md-3 col-6 mb-4">
                <div className="stat-item">
                  <i className="bi bi-trophy-fill stat-icon"></i>
                  <h3 className="stat-number">50+</h3>
                  <p className="stat-label">Tournaments Won</p>
                </div>
              </div>
              <div className="col-md-3 col-6 mb-4">
                <div className="stat-item">
                  <i className="bi bi-calendar-check-fill stat-icon"></i>
                  <h3 className="stat-number">85</h3>
                  <p className="stat-label">Years of Excellence</p>
                </div>
              </div>
              <div className="col-md-3 col-6 mb-4">
                <div className="stat-item">
                  <i className="bi bi-star-fill stat-icon"></i>
                  <h3 className="stat-number">100+</h3>
                  <p className="stat-label">National Champions</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <div id="gallery-section">
          <Gallery />
        </div>

        {/* Services Section */}
        <section className="services-section">
          <div className="container">
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">Comprehensive badminton training and facilities</p>
            <div className="row g-4">
              <div className="col-lg-4 col-md-6">
                <div className="service-card">
                  <div className="service-icon">
                    <i className="bi bi-person-workspace"></i>
                  </div>
                  <h3>Professional Coaching</h3>
                  <p>Expert coaches with international experience provide personalized training programs for all skill levels.</p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="service-card">
                  <div className="service-icon">
                    <i className="bi bi-building"></i>
                  </div>
                  <h3>World-Class Facilities</h3>
                  <p>Multiple indoor courts with professional flooring, lighting, and equipment for optimal training experience.</p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="service-card">
                  <div className="service-icon">
                    <i className="bi bi-calendar-event"></i>
                  </div>
                  <h3>Tournament Organization</h3>
                  <p>Regular tournaments and competitions to test skills and foster competitive spirit among players.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <div id="about-section" className="scroll-target">
          <AboutUs />
        </div>

        {/* Testimonials Section */}
        <section className="testimonials-section">
          <div className="container">
            <h2 className="section-title">What Our Members Say</h2>
            <div className="row g-4">
              <div className="col-lg-4 col-md-6">
                <div className="testimonial-card">
                  <div className="testimonial-content">
                    <p>"The coaching here transformed my game completely. I've improved so much in just a year!"</p>
                  </div>
                  <div className="testimonial-author">
                    <h4>Rahul Sharma</h4>
                    <span>National Level Player</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="testimonial-card">
                  <div className="testimonial-content">
                    <p>"Best badminton academy in the region. The facilities and coaching are world-class."</p>
                  </div>
                  <div className="testimonial-author">
                    <h4>Priya Patel</h4>
                    <span>State Champion</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="testimonial-card">
                  <div className="testimonial-content">
                    <p>"Great community and excellent training programs. My kids love coming here!"</p>
                  </div>
                  <div className="testimonial-author">
                    <h4>Anita Singh</h4>
                    <span>Parent</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <div id="contact-section">
          <ContactForm />
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="footer-section">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4 col-md-6">
              <div className="footer-brand">
                <img 
                  src="assets/Picture2.png" 
                  alt="Bijoy Institute Logo" 
                  className="footer-logo"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/50x50/2c3e50/ffffff?text=BI';
                    e.target.alt = 'Bijoy Institute Logo';
                  }}
                />
                <h3>Bijoy Institute</h3>
                <p>Founded in 1938, we've been nurturing badminton talent for over eight decades with world-class coaching and facilities.</p>
              </div>
            </div>

            <div className="col-lg-2 col-md-6">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><a href="/"><i className="bi bi-house-door"></i> Home</a></li>
                <li><a href="/members"><i className="bi bi-people"></i> Members</a></li>
                <li><a href="/events"><i className="bi bi-calendar-event"></i> Events</a></li>
                <li><a href="/coaching"><i className="bi bi-person-workspace"></i> Coaching</a></li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6">
              <h4>Contact Info</h4>
              <div className="contact-info">
                <p><i className="bi bi-geo-alt"></i> Ranchi, Jharkhand, India</p>
                <p><i className="bi bi-telephone"></i> +91 98765 43210</p>
                <p><i className="bi bi-envelope"></i> info@sportsclub.com</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <h4>Connect With Us</h4>
              <div className="social-links">
                <a href="#" className="social-link"><i className="bi bi-facebook"></i></a>
                <a href="#" className="social-link"><i className="bi bi-instagram"></i></a>
                <a href="#" className="social-link"><i className="bi bi-twitter-x"></i></a>
                <a href="#" className="social-link"><i className="bi bi-youtube"></i></a>
              </div>
              <div className="newsletter">
                <h5>Newsletter</h5>
                <p>Stay updated with our latest news and events</p>
                <div className="input-group">
                  <input type="email" className="form-control" placeholder="Your email" />
                  <button className="btn btn-primary">Subscribe</button>
                </div>
              </div>
            </div>
          </div>

          <hr className="footer-divider" />
          <div className="footer-bottom">
            <div className="row align-items-center">
              <div className="col-md-6">
                <p>&copy; {new Date().getFullYear()} Bijoy Institute. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
