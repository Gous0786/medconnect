import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/DoctorRecommendationsPage.css';
import DoctorCard from '../components/DoctorCard';

const DoctorRecommendationsPage = () => {
  const navigate = useNavigate();
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [sortBy, setSortBy] = useState('experience'); // Default sort by experience

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

  // Sort doctors based on selected criteria
  const sortedDoctors = filteredDoctors.sort((a, b) => {
    if (sortBy === 'fee') {
      return a.fee - b.fee; // Sort by consultation fee
    } else {
      return b.experience - a.experience; // Sort by experience (descending)
    }
  });

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

      <div className="sort-by">
        <label htmlFor="sort-select">Sort by:</label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="experience">Experience</option>
          <option value="fee">Consultation Fee</option>
        </select>
      </div>

      <div className="doctors-grid">
        {sortedDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>

      {sortedDoctors.length === 0 && (
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