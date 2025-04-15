import React from 'react';
import '../styles/DoctorCard.css'; 

const DoctorCard = ({ doctor }) => {
  // Ensure doctor is defined and has the expected properties
  if (!doctor) {
    return <div>No doctor information available.</div>;
  }

  const {
    name,
    specialty,
    qualifications = [], 
    hospital,
    location,
    experience,
    fee,
    timing,
    isAvailable,
  } = doctor;

  return (
    <div className="doctor-card">
      <h2>{name}</h2>
      <p>Specialty: {specialty}</p>
      <p>Qualifications: {qualifications.length > 0 ? qualifications.join(', ') : 'N/A'}</p>
      <p>Hospital: {hospital}</p>
      <p>Location: {location}</p>
      <p>Experience: {experience} years</p>
      <p>Consultation Fee: Rs {fee}</p>
      <p>Timing: {timing}</p>
      <p>{isAvailable ? 'Available for appointments' : 'Not available'}</p>
    </div>
  );
};

export default DoctorCard; 