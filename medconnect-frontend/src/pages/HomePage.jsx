import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1>MedConnect</h1>
          <p className="tagline">AI-Driven Patient-Doctor Matching</p>
          <p className="hero-description">
            Find the right doctor for your specific medical needs using our advanced AI technology
          </p>
          <div className="cta-buttons">
            <Link to="/symptom-capture" className="cta-button primary">Describe Symptoms</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://as2.ftcdn.net/v2/jpg/01/03/72/93/1000_F_103729376_QE8y6FP10JyGc4kk8e2yIqrFRa921IqI.jpg" alt="Doctor and patient" />
        </div>
      </header>

      <div className="add-profile-button">
        <Link to="/add-doctor" className="cta-button secondary">Add Your Profile</Link>
      </div>

      <section className="features-section">
        <h2>How MedConnect Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-microphone"></i>
            </div>
            <h3>Voice Chatbot</h3>
            <p>Describe your symptoms in your preferred language with our AI-powered voice assistant</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-file-medical"></i>
            </div>
            <h3>Document Analysis</h3>
            <p>Upload your medical reports for AI analysis to improve doctor recommendations</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-user-md"></i>
            </div>
            <h3>Doctor Matching</h3>
            <p>Get matched with specialists based on your symptoms and medical history</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-calendar-check"></i>
            </div>
            <h3>Easy Booking</h3>
            <p>Filter by location, fees, and reviews to book appointments with your preferred doctors</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>Your Path to Better Healthcare</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Describe Your Symptoms</h3>
            <p>Use our voice chatbot to explain your health concerns in your preferred language</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Upload Medical Reports</h3>
            <p>Share your existing health documents for more accurate recommendations</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Get Matched with Specialists</h3>
            <p>Our AI suggests the right medical specialists based on your inputs</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Book Your Appointment</h3>
            <p>Choose from available doctors and schedule a consultation</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Find Your Perfect Doctor Match?</h2>
        <p>Join thousands of patients who have found the right healthcare with MedConnect</p>
        <Link to="/symptom-capture" className="cta-button primary large">Get Started Now</Link>
      </section>
    </div>
  );
};

export default HomePage; 