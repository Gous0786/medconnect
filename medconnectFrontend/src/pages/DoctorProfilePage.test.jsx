
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import DoctorProfilePage from './DoctorProfilePage';

// Mock the CSS import
jest.mock('../styles/DoctorProfilePage.css', () => ({}));

// Mock fetch for API calls
global.fetch = jest.fn();

const renderWithRouter = (component) => {
  return render(<Router>{component}</Router>);
};

describe('DoctorProfilePage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  test('submits the form successfully', async () => {
    renderWithRouter(<DoctorProfilePage />);
  
    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: 'Dr. Smith' } });
    fireEvent.change(screen.getByLabelText(/Specialty:/i), { target: { value: 'Cardiology' } });
    fireEvent.change(screen.getByLabelText(/Qualifications:/i), { target: { value: 'MD' } });
    fireEvent.change(screen.getByLabelText(/Hospital:/i), { target: { value: 'City Hospital' } });
    fireEvent.change(screen.getByLabelText(/Location:/i), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText(/Experience \(years\):/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/Consultation Fee \(Rs\):/i), { target: { value: '500' } });
    fireEvent.change(screen.getByLabelText(/Timing:/i), { target: { value: '9 AM - 5 PM' } });
  
    // Mock fetch to return a successful response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Profile added successfully' })
    });
  
    // Submit the form
    fireEvent.click(screen.getByText('Submit Profile'));
  
    // Wait for the alert to be called
    const expectedBody = {
        name: 'Dr. Smith',
        specialty: 'Cardiology',
        qualifications: 'MD',
        hospital: 'City Hospital',
        location: 'New York',
        experience: '10',
        languages: '',
        fee: '500',
        timing: '9 AM - 5 PM',
        isAvailable: true,
      };
      
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:5000/api/doctors',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        })
      );
      
      // Parse the actual body and compare as objects
      const actualBody = JSON.parse(global.fetch.mock.calls[0][1].body);
      expect(actualBody).toEqual(expectedBody);
  
    
  });



  test('submits the form successfully', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    renderWithRouter(<DoctorProfilePage />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: 'Dr. Smith' } });
    fireEvent.change(screen.getByLabelText(/Specialty:/i), { target: { value: 'Cardiology' } });
    fireEvent.change(screen.getByLabelText(/Qualifications:/i), { target: { value: 'MD' } });
    fireEvent.change(screen.getByLabelText(/Hospital:/i), { target: { value: 'City Hospital' } });
    fireEvent.change(screen.getByLabelText(/Location:/i), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText(/Experience \(years\):/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/Consultation Fee \(Rs\):/i), { target: { value: '500' } });
    fireEvent.change(screen.getByLabelText(/Timing:/i), { target: { value: '9 AM - 5 PM' } });

    // Mock fetch to return a successful response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Profile added successfully' })
    });

    // Submit the form
    fireEvent.click(screen.getByText('Submit Profile'));

    // Wait for the alert to be called
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:5000/api/doctors',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'Dr. Smith',
            specialty: 'Cardiology',
            qualifications: 'MD',
            hospital: 'City Hospital',
            location: 'New York',
            experience: '10',
            languages:'',
            fee: '500',
            timing: '9 AM - 5 PM',
            isAvailable: true,
          }),
        })
      );
    });

    // Check if alert was called with the success message
    expect(window.alert).toHaveBeenCalledWith('Profile added successfully');
  });

  test('handles submission error', async () => {
    // Mock fetch to return an error
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Failed to add doctor profile' })
    });

    // Mock window.alert
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    renderWithRouter(<DoctorProfilePage />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: 'Dr. Smith' } });
    fireEvent.change(screen.getByLabelText(/Specialty:/i), { target: { value: 'Cardiology' } });
    fireEvent.change(screen.getByLabelText(/Qualifications:/i), { target: { value: 'MD' } });
    fireEvent.change(screen.getByLabelText(/Hospital:/i), { target: { value: 'City Hospital' } });
    fireEvent.change(screen.getByLabelText(/Location:/i), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText(/Experience \(years\):/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/Consultation Fee \(Rs\):/i), { target: { value: '500' } });
    fireEvent.change(screen.getByLabelText(/Timing:/i), { target: { value: '9 AM - 5 PM' } });

    // Submit the form
    fireEvent.click(screen.getByText('Submit Profile'));

    // Wait for alert to be called
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Failed to add doctor profile');
    });

    // Clean up mock
    alertMock.mockRestore();
  });
});