import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SymptomCapturePage from './pages/SymptomCapturePage';
import DoctorRecommendationsPage from './pages/DoctorRecommendationsPage';
import DoctorProfilePage from './pages/DoctorProfilePage';
import './App.css';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/symptom-capture" element={<SymptomCapturePage />} />
      <Route path="/doctor-recommendations" element={<DoctorRecommendationsPage />} />
      <Route path="/add-doctor" element={<DoctorProfilePage />} />
      <Route path="/upload-reports" element={<div>Upload Reports Page (Coming Soon)</div>} />
      <Route path="/get-started" element={<div>Get Started Page (Coming Soon)</div>} />
    </Routes>
  );
}

export default AppRoutes;
