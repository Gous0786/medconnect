import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import '@testing-library/jest-dom';
import HomePage from './HomePage';

// Mock the CSS import
jest.mock('../styles/HomePage.css', () => ({}));

const renderWithRouter = (component) => {
  const routes = [
    {
      path: '/',
      element: component,
    },
    {
      path: '/symptom-capture',
      element: <div>Symptom Capture Page</div>,
    },
    {
      path: '/add-doctor',
      element: <div>Add Doctor Page</div>,
    }
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
    initialIndex: 0,
  });

  return render(<RouterProvider router={router} />);
};

describe('HomePage Component', () => {
  test('renders main heading and tagline', () => {
    renderWithRouter(<HomePage />);
    
    expect(screen.getByText('MedConnect')).toBeInTheDocument();
    expect(screen.getByText('AI-Driven Patient-Doctor Matching')).toBeInTheDocument();
    expect(screen.getByText('Find the right doctor for your specific medical needs using our advanced AI technology')).toBeInTheDocument();
  });

  test('renders hero section with image', () => {
    renderWithRouter(<HomePage />);
    
    const heroImage = screen.getByAltText('Doctor and patient');
    expect(heroImage).toBeInTheDocument();
    expect(heroImage.tagName).toBe('IMG');
    expect(heroImage).toHaveAttribute('src', expect.stringContaining('jpg'));
  });

  test('renders "Describe Symptoms" button with correct link', () => {
    renderWithRouter(<HomePage />);
    
    const symptomButton = screen.getByText('Describe Symptoms');
    expect(symptomButton).toBeInTheDocument();
    expect(symptomButton.tagName).toBe('A');
    expect(symptomButton).toHaveAttribute('href', '/symptom-capture');
    expect(symptomButton).toHaveClass('cta-button');
    expect(symptomButton).toHaveClass('primary');
  });

  test('renders "Add Your Profile" button with correct link', () => {
    renderWithRouter(<HomePage />);
    
    const addProfileButton = screen.getByText('Add Your Profile');
    expect(addProfileButton).toBeInTheDocument();
    expect(addProfileButton.tagName).toBe('A');
    expect(addProfileButton).toHaveAttribute('href', '/add-doctor');
    expect(addProfileButton).toHaveClass('cta-button');
    expect(addProfileButton).toHaveClass('secondary');
  });

  

  test('renders all four steps in the how-it-works section', () => {
    renderWithRouter(<HomePage />);
    
    // Check section heading
    expect(screen.getByText('Your Path to Better Healthcare')).toBeInTheDocument();
    
    // Check each step
    const stepHeadings = [
      'Describe Your Symptoms',
      'Upload Medical Reports',
      'Get Matched with Specialists',
      'Book Your Appointment'
    ];
    
    stepHeadings.forEach(heading => {
      expect(screen.getByText(heading)).toBeInTheDocument();
    });
    
    // Check for step numbers
    const stepNumbers = ['1', '2', '3', '4'];
    stepNumbers.forEach(number => {
      expect(screen.getByText(number)).toBeInTheDocument();
    });
  });

  test('renders final CTA section with button', () => {
    renderWithRouter(<HomePage />);
    
    expect(screen.getByText('Ready to Find Your Perfect Doctor Match?')).toBeInTheDocument();
    expect(screen.getByText('Join thousands of patients who have found the right healthcare with MedConnect')).toBeInTheDocument();
    
    const ctaButton = screen.getByText('Get Started Now');
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton.tagName).toBe('A');
    expect(ctaButton).toHaveAttribute('href', '/symptom-capture');
    expect(ctaButton).toHaveClass('cta-button');
    expect(ctaButton).toHaveClass('primary');
    expect(ctaButton).toHaveClass('large');
  });

  test('renders all FontAwesome icons', () => {
    renderWithRouter(<HomePage />);
    
    // Check that all FontAwesome icons are present
    const iconClasses = [
      'fas fa-microphone',
      'fas fa-file-medical',
      'fas fa-user-md',
      'fas fa-calendar-check'
    ];
    
    iconClasses.forEach(iconClass => {
      const elements = document.getElementsByClassName(iconClass);
      expect(elements.length).toBeGreaterThan(0);
    });
  });
});