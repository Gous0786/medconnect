
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App Routing', () => {
  test('renders HomePage on root path "/"', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('MedConnect')).toBeInTheDocument();
    expect(screen.getByText(/AI-Driven Patient-Doctor Matching/i)).toBeInTheDocument();
  });

  test('renders SymptomCapturePage on "/symptom-capture"', () => {
    render(
      <MemoryRouter initialEntries={['/symptom-capture']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Describe Your Symptoms/i)).toBeInTheDocument();
  });

  test('renders DoctorRecommendationsPage on "/doctor-recommendations"', () => {
    render(
      <MemoryRouter initialEntries={['/doctor-recommendations']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Doctor Recommendations/i)).toBeInTheDocument();
  });

  test('renders DoctorProfilePage on "/add-doctor"', () => {
    render(
      <MemoryRouter initialEntries={['/add-doctor']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Submit Profile/i)).toBeInTheDocument();
  });

  test('renders Upload Reports placeholder', () => {
    render(
      <MemoryRouter initialEntries={['/upload-reports']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Upload Reports Page \(Coming Soon\)/i)).toBeInTheDocument();
  });

  test('renders Get Started placeholder', () => {
    render(
      <MemoryRouter initialEntries={['/get-started']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Get Started Page \(Coming Soon\)/i)).toBeInTheDocument();
  });
});
