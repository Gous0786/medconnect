
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import DoctorRecommendationsPage from './DoctorRecommendationsPage';

// Mock the CSS import
jest.mock('../styles/DoctorRecommendationsPage.css', () => ({}));

// Mock fetch for API calls
global.fetch = jest.fn();

const renderWithRouter = (component) => {
  return render(<Router>{component}</Router>);
};

describe('DoctorRecommendationsPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
    localStorage.clear(); 
  });

  test('renders the page with no recommendations', () => {
    renderWithRouter(<DoctorRecommendationsPage />);

    expect(screen.getByText(/No Recommendations Found/i)).toBeInTheDocument();
    expect(screen.getByText(/Please describe your symptoms first to get doctor recommendations./i)).toBeInTheDocument();
  });

  test('renders the page with recommendations', async () => {
    const mockRecommendations = {
      data: {
        doctors: [
          { id: 1, name: 'Dr. Smith', specialty: 'Cardiology', qualifications: ['MD'], hospital: 'City Hospital', location: 'New York', experience: 10, fee: 500 },
          { id: 2, name: 'Dr. Jones', specialty: 'Dermatology', qualifications: ['MD'], hospital: 'Skin Clinic', location: 'Los Angeles', experience: 5, fee: 300 },
        ],
        specialties: ['cardiology', 'dermatology'],
      },
    };

    localStorage.setItem('doctorRecommendations', JSON.stringify(mockRecommendations));

    renderWithRouter(<DoctorRecommendationsPage />);

    // Check if the doctors are rendered
    expect(await screen.findByText('Dr. Smith')).toBeInTheDocument();
    expect(screen.getByText('Dr. Jones')).toBeInTheDocument();
  });

  test('filters doctors by specialty', async () => {
    const mockRecommendations = {
      data: {
        doctors: [
          { id: 1, name: 'Dr. Smith', specialty: 'Cardiology', qualifications: ['MD'], hospital: 'City Hospital', location: 'New York', experience: 10, fee: 500 },
          { id: 2, name: 'Dr. Jones', specialty: 'Dermatology', qualifications: ['MD'], hospital: 'Skin Clinic', location: 'Los Angeles', experience: 5, fee: 300 },
        ],
        specialties: ['cardiology', 'dermatology'],
      },
    };

    localStorage.setItem('doctorRecommendations', JSON.stringify(mockRecommendations));

    renderWithRouter(<DoctorRecommendationsPage />);

    // Check if the doctors are rendered
    expect(await screen.findByText('Dr. Smith')).toBeInTheDocument();
    expect(screen.getByText('Dr. Jones')).toBeInTheDocument();

    // Filter by specialty
    fireEvent.change(screen.getByLabelText(/Filter by Specialty:/i), { target: { value: 'cardiology' } });

    // Check that only Dr. Smith is displayed
    expect(screen.getByText('Dr. Smith')).toBeInTheDocument();
    expect(screen.queryByText('Dr. Jones')).not.toBeInTheDocument();
  });

  test('sorts doctors by fee', async () => {
    const mockRecommendations = {
      data: {
        doctors: [
          { id: 1, name: 'Dr. Smith', specialty: 'Cardiology', qualifications: ['MD'], hospital: 'City Hospital', location: 'New York', experience: 10, fee: 500 },
          { id: 2, name: 'Dr. Jones', specialty: 'Dermatology', qualifications: ['MD'], hospital: 'Skin Clinic', location: 'Los Angeles', experience: 5, fee: 300 },
        ],
        specialties: ['cardiology', 'dermatology'],
      },
    };
  
    localStorage.setItem('doctorRecommendations', JSON.stringify(mockRecommendations));
  
    renderWithRouter(<DoctorRecommendationsPage />);
  
    // Check if the doctors are rendered
    expect(await screen.findByText('Dr. Smith')).toBeInTheDocument();
    expect(screen.getByText('Dr. Jones')).toBeInTheDocument();
  
    // Sort by fee
    fireEvent.change(screen.getByLabelText(/Sort by:/i), { target: { value: 'fee' } });
  
    // Check that Dr. Jones appears before Dr. Smith
    const doctorCards = screen.getAllByText(/Dr\.\s*Smith|Dr\.\s*Jones/i);
    expect(doctorCards[0]).toHaveTextContent('Dr. Jones');
    expect(doctorCards[1]).toHaveTextContent('Dr. Smith');
  });
});