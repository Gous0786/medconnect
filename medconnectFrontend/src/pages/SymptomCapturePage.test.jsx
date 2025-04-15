import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import '@testing-library/jest-dom';
import SymptomCapturePage from './SymptomCapturePage';

// Mock the CSS import
jest.mock('../styles/SymptomCapturePage.css', () => ({}));

// Mock the SpeechRecognition API
const mockSpeechRecognition = {
  start: jest.fn(),
  stop: jest.fn(),
  onstart: null,
  onresult: null,
  onerror: null,
  onend: null,
  continuous: false,
  interimResults: false,
  lang: '',
};

// Mock fetch for API calls
global.fetch = jest.fn();

const renderWithRouter = (component) => {
  const routes = [
    {
      path: '/',
      element: component,
    },
    {
      path: '/doctor-recommendations',
      element: <div>Doctor Recommendations Page</div>,
    }
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
    initialIndex: 0,
  });

  return render(<RouterProvider router={router} />);
};

describe('SymptomCapturePage Component', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Mock SpeechRecognition
    window.SpeechRecognition = jest.fn(() => mockSpeechRecognition);
    window.webkitSpeechRecognition = jest.fn(() => mockSpeechRecognition);
    
    // Reset localStorage
    localStorage.clear();
    
    // Default mock for fetch
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ recordId: 'test-id', recommendations: [] })
    });
  });

  test('toggles recording state when record button is clicked', () => {
    renderWithRouter(<SymptomCapturePage />);
    
    const recordButton = screen.getByText(/Start Recording/i);
    
    // Start recording
    fireEvent.click(recordButton);
    expect(mockSpeechRecognition.start).toHaveBeenCalledTimes(1);
    
    // Fire onstart event to simulate recording started
    act(() => {
      mockSpeechRecognition.onstart();
    });
    
    // Check if recording indicator appears
    expect(screen.getByText(/Recording.../i)).toBeInTheDocument();
    
    // Stop recording
    fireEvent.click(screen.getByText(/Stop Recording/i));
    expect(mockSpeechRecognition.stop).toHaveBeenCalledTimes(1);
    
    // Fire onend event to simulate recording stopped
    act(() => {
      mockSpeechRecognition.onend();
    });
    
    // Check if start recording button reappears
    expect(screen.getByText(/Start Recording/i)).toBeInTheDocument();
  });

  test('updates transcript when speech recognition returns results', () => {
    renderWithRouter(<SymptomCapturePage />);
    
    // Simulate speech recognition result
    act(() => {
      mockSpeechRecognition.onresult({
        results: [[{ transcript: 'I have a headache' }]]
      });
    });
    
    // Check if transcript is updated
    const textarea = screen.getByPlaceholderText(/Your spoken symptoms will appear here/i);
    expect(textarea.value).toBe('I have a headache');
  });

  test('allows manual editing of transcript', () => {
    renderWithRouter(<SymptomCapturePage />);
    
    const textarea = screen.getByPlaceholderText(/Your spoken symptoms will appear here/i);
    
    // Simulate typing in the textarea
    fireEvent.change(textarea, { target: { value: 'I have a fever' } });
    
    // Check if transcript is updated
    expect(textarea.value).toBe('I have a fever');
  });

  test('handles file upload', () => {
    renderWithRouter(<SymptomCapturePage />);
    
    // Create a mock file
    const file = new File(['dummy content'], 'test.pdf', { type: 'application/pdf' });
    
    // Get the "Select Files" button and click it
    const selectFilesButton = screen.getByText('Select Files');
    
    // Create a mock file input and trigger change event
    const fileInput = document.querySelector('input[type="file"][accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"]');
    
    // Simulate file selection
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    // Check if file appears in the list
    expect(screen.getByText('test.pdf')).toBeInTheDocument();
  });

  test('removes uploaded file when remove button is clicked', () => {
    renderWithRouter(<SymptomCapturePage />);
    
    // Create a mock file and upload it
    const file = new File(['dummy content'], 'test.pdf', { type: 'application/pdf' });
    const fileInput = document.querySelector('input[type="file"][accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"]');
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    // Check if file appears
    expect(screen.getByText('test.pdf')).toBeInTheDocument();
    
    // Click remove button
    fireEvent.click(screen.getByText('Remove'));
    
    // Check if file is removed
    expect(screen.queryByText('test.pdf')).not.toBeInTheDocument();
  });

  test('submits form data successfully', async () => {
    renderWithRouter(<SymptomCapturePage />);
    
    // Set up transcript
    const textarea = screen.getByPlaceholderText(/Your spoken symptoms will appear here/i);
    fireEvent.change(textarea, { target: { value: 'I have a cough' } });
    
    // Upload a file
    const file = new File(['dummy content'], 'test.pdf', { type: 'application/pdf' });
    const fileInput = document.querySelector('input[type="file"][accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"]');
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    // Submit the form
    const submitButton = screen.getByText('Submit Symptoms');
    fireEvent.click(submitButton);
    
    // Wait for submission to complete
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:5000/api/symptoms',
        expect.objectContaining({
          method: 'POST',
          body: expect.any(FormData),
          headers: expect.objectContaining({
            'Accept': 'application/json'
          })
        })
      );
    });
    
    // Check if success message appears
    await waitFor(() => {
        expect(screen.getByText((content) => content.startsWith('Information Submitted Successfully!'))).toBeInTheDocument();
      });
    
    // Check if localStorage was updated
    expect(localStorage.getItem('doctorRecommendations')).not.toBeNull();
  });

  test('shows error alert when submission fails', async () => {
    // Mock fetch to return an error
    global.fetch.mockResolvedValue({
      ok: false,
      json: async () => ({ message: 'Server error' })
    });
    
    // Mock window.alert
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    renderWithRouter(<SymptomCapturePage />);
    
    // Set up transcript
    const textarea = screen.getByPlaceholderText(/Your spoken symptoms will appear here/i);
    fireEvent.change(textarea, { target: { value: 'I have a cough' } });
    
    // Submit the form
    const submitButton = screen.getByText('Submit Symptoms');
    fireEvent.click(submitButton);
    
    // Wait for alert to be called
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith(expect.stringContaining('Failed to submit data'));
    });
    
    // Clean up mock
    alertMock.mockRestore();
  });

  test('clears form when "Submit Another" is clicked after success', async () => {
    renderWithRouter(<SymptomCapturePage />);
    
    // Set up transcript and submit
    const textarea = screen.getByPlaceholderText(/Your spoken symptoms will appear here/i);
    fireEvent.change(textarea, { target: { value: 'I have a cough' } });
    
    const submitButton = screen.getByText('Submit Symptoms');
    fireEvent.click(submitButton);
    
    // Wait for success screen
    await waitFor(() => {
      expect(screen.getByText(/Information Submitted Successfully!/i)).toBeInTheDocument();
    });
    
    // Store something in localStorage to verify it gets cleared
    localStorage.setItem('doctorRecommendations', JSON.stringify({ data: 'test' }));
    
    // Click "Submit Another"
    fireEvent.click(screen.getByText('Submit Another'));
    
    // Check if form is reset
    expect(screen.getByPlaceholderText(/Your spoken symptoms will appear here/i).value).toBe('');
    expect(localStorage.getItem('doctorRecommendations')).toBeNull();
  });

  test('shows alert when trying to submit without symptoms or files', () => {
    // Mock window.alert
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    renderWithRouter(<SymptomCapturePage />);
    
    // Submit empty form
    const submitButton = screen.getByText('Submit Symptoms');
    fireEvent.click(submitButton);
    
    // Check if alert was shown
    expect(alertMock).toHaveBeenCalledWith('Please provide symptom description or upload medical reports.');
    
    // Clean up mock
    alertMock.mockRestore();
  });
});