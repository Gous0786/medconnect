import React, { useState } from 'react';
import '../styles/DoctorProfilePage.css';

const DoctorProfilePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    qualifications: '',
    hospital: '',
    location: '',
    experience: '',
    languages: '',
    fee: '',
    timing: '',
    isAvailable: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting doctor profile:', formData);
    try {
      const response = await fetch('http://localhost:5000/api/doctors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error('Failed to add doctor profile');
      }

      const result = await response.json();
      console.log('Response data:', result);
      alert(result.message);
      setFormData({
        name: '',
        specialty: '',
        qualifications: '',
        hospital: '',
        location: '',
        experience: '',
        languages: '',
        fee: '',
        timing: '',
        isAvailable: true,
      });
    } catch (error) {
      console.error('Error adding doctor profile:', error);
      alert(error.message);
    }
  };

  return (
    <div className="doctor-profile-container">
      <h1>Add Your Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="specialty">Specialty:</label>
          <input type="text" id="specialty" name="specialty" value={formData.specialty} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="qualifications">Qualifications:</label>
          <input type="text" id="qualifications" name="qualifications" value={formData.qualifications} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="hospital">Hospital:</label>
          <input type="text" id="hospital" name="hospital" value={formData.hospital} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="experience">Experience (years):</label>
          <input type="number" id="experience" name="experience" value={formData.experience} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="fee">Consultation Fee (Rs):</label>
          <input type="number" id="fee" name="fee" value={formData.fee} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="timing">Timing:</label>
          <input type="text" id="timing" name="timing" value={formData.timing} onChange={handleChange} required />
        </div>
        <div>
          <label>
            <input type="checkbox" name="isAvailable" checked={formData.isAvailable} onChange={handleChange} />
            Available for appointments
          </label>
        </div>
        <button type="submit">Submit Profile</button>
      </form>
    </div>
  );
};

export default DoctorProfilePage;
