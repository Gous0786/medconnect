import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/DoctorRecommendationsPage.css';

const DoctorRecommendationsPage = () => {
  const navigate = useNavigate();
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  // Get recommendations from localStorage instead of making an API call
  const storedData = localStorage.getItem('doctorRecommendations');
  
  if (!storedData) {
    return (
      <div className="recommendations-container error">
        <div className="error-message">
          <i className="fas fa-exclamation-circle"></i>
          <h2>No Recommendations Found</h2>
          <p>Please describe your symptoms first to get doctor recommendations.</p>
          <Link to="/symptom-capture" className="retry-button">
            Describe Symptoms
          </Link>
        </div>
      </div>
    );
  }

  const recommendations = JSON.parse(storedData);
  const allDoctors = recommendations?.data?.doctors || [];
  const specialties = ['all', ...(recommendations?.data?.specialties || [])];
  
  const filteredDoctors = selectedSpecialty === 'all' 
    ? allDoctors 
    : allDoctors.filter(doctor => doctor.specialty.toLowerCase() === selectedSpecialty.toLowerCase());

  const DoctorCard = ({ doctor }) => (
    <div className="doctor-card">
      <div className="doctor-image">
        <i className="fas fa-user-md"></i>
      </div>
      <div className="doctor-info">
        <h2>{doctor.name}</h2>
        <p className="specialty">{doctor.specialty.charAt(0).toUpperCase() + doctor.specialty.slice(1)}</p>
        
        <div className="doctor-qualifications">
          {doctor.qualifications.map((qual, index) => (
            <span key={index} className="qualification-badge">
              {qual}
            </span>
          ))}
        </div>

        <div className="doctor-details">
          <p>
            <i className="fas fa-hospital"></i>
            {doctor.hospital}
          </p>
          <p>
            <i className="fas fa-map-marker-alt"></i>
            {doctor.location}
          </p>
          <p>
            <i className="fas fa-graduation-cap"></i>
            {doctor.experience} years experience
          </p>
          <p>
            <i className="fas fa-language"></i>
            {doctor.languages.join(', ')}
          </p>
          <p>
            <i className="fas fa-rupee-sign"></i>
            Consultation: ₹{doctor.fee}
          </p>
          <p>
            <i className="fas fa-clock"></i>
            {doctor.timing}
          </p>
          <p>
            <i className="fas fa-users"></i>
            {doctor.totalPatients.toLocaleString()} patients treated
          </p>
        </div>

        <div className="doctor-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`fas fa-star ${i < Math.floor(doctor.rating) ? 'filled' : ''}`}
              ></i>
            ))}
          </div>
          <span>{doctor.rating.toFixed(1)}</span>
        </div>
      </div>

      <div className="doctor-actions">
        <button 
          className={`book-appointment ${!doctor.isAvailable ? 'disabled' : ''}`}
          disabled={!doctor.isAvailable}
        >
          <i className="fas fa-calendar-check"></i>
          {doctor.isAvailable ? 'Book Appointment' : 'Not Available'}
        </button>
        <button className="view-profile">
          <i className="fas fa-user"></i>
          View Profile
        </button>
      </div>
    </div>
  );

  return (
    <div className="recommendations-container">
      <div className="recommendations-header">
        <h1>Recommended Doctors</h1>
        <p>Based on your symptoms, we found {allDoctors.length} matching specialists</p>
      </div>

      <div className="specialty-filter">
        <label htmlFor="specialty-select">Filter by Specialty:</label>
        <select
          id="specialty-select"
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
        >
          {specialties.map(specialty => (
            <option key={specialty} value={specialty}>
              {specialty === 'all' ? 'All Specialties' : 
                specialty.charAt(0).toUpperCase() + specialty.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="doctors-grid">
        {filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="no-results">
          <i className="fas fa-search"></i>
          <h2>No doctors found</h2>
          <p>Try selecting a different specialty or broadening your search criteria</p>
        </div>
      )}

      <div className="recommendations-footer">
        <Link to="/symptom-capture" className="new-search-button">
          <i className="fas fa-plus"></i>
          New Symptom Search
        </Link>
      </div>
    </div>
  );
};

export default DoctorRecommendationsPage; 