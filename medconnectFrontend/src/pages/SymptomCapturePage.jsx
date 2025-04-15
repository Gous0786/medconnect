import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SymptomCapturePage.css';

const SymptomCapturePage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const recognitionRef = useRef(null);
  const fileInputRef = useRef(null);

  // Initialize speech recognition
  useEffect(() => {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      alert('Your browser does not support speech recognition. Please use Google Chrome.');
      return;
    }

    recognitionRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognitionRef.current.continuous = false; // Set to true for continuous recognition
    recognitionRef.current.interimResults = false; // Set to true for interim results
    recognitionRef.current.lang = 'en-IN'; // Set the default language

    recognitionRef.current.onstart = () => {
      console.log('Speech recognition service has started');
    };

    recognitionRef.current.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      console.log(`Recognized: ${result}`);
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Error occurred in recognition:', event.error);
    };

    recognitionRef.current.onend = () => {
      console.log('Recognition ended');
      setIsRecording(false);
    };
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current.stop();
      console.log('Stopping recording...');
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      console.log('Starting recording...');
      setIsRecording(true);
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const removeFile = (index) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!transcript.trim() && uploadedFiles.length === 0) {
      alert('Please provide symptom description or upload medical reports.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Create form data to send files and text
      const formData = new FormData();
      formData.append('symptomDescription', transcript);
      
      uploadedFiles.forEach((file) => {
        formData.append('medicalReports', file);
      });

      // Make the API call to backend
      const response = await fetch('http://localhost:5000/api/symptoms', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit data');
      }
      
      const data = await response.json();
      console.log('Submission successful:', data);
      
      // Store both the recordId and the recommendations data
      localStorage.setItem('doctorRecommendations', JSON.stringify(data));
      
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error submitting data:', error);
      alert(`Failed to submit data: ${error.message || 'Network error occurred'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearAll = () => {
    setTranscript('');
    setUploadedFiles([]);
    setSubmitSuccess(false);
    localStorage.removeItem('doctorRecommendations'); 
  };

  return (
    <div className="symptom-capture-container">
      <div className="capture-header">
        <h1>Describe Your Symptoms</h1>
        <p>Speak or type your symptoms, and upload any relevant medical reports</p>
      </div>

      {submitSuccess ? (
        <div className="success-container">
          <div className="success-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <h2>Information Submitted Successfully!</h2>
          <p>We're analyzing your symptoms and finding the best doctor match for you.</p>
          <div className="success-actions">
            <Link to="/doctor-recommendations" className="primary-button">
              View Recommendations
            </Link>
            <button onClick={clearAll} className="secondary-button">
              Submit Another
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="voice-input-section">
            <div className="voice-controls">
              <button 
                className={`record-button ${isRecording ? 'recording' : ''}`} 
                onClick={toggleRecording}
                disabled={isSubmitting}
              >
                {isRecording ? (
                  <i className="fas fa-stop-circle"></i>
                ) : (
                  <i className="fas fa-microphone"></i>
                )}
                {isRecording ? ' Stop Recording' : ' Start Recording'}
              </button>
              {isRecording && <div className="recording-indicator">Recording...</div>}
            </div>

            <div className="transcript-container">
              <h3>Your Symptom Description:</h3>
              <div className="transcript-wrapper">
                <textarea
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  placeholder="Your spoken symptoms will appear here. You can also type or edit directly."
                  rows={8}
                  disabled={isSubmitting}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="file-upload-section">
            <h3>Upload Medical Reports (Optional)</h3>
            <p>Upload any relevant medical reports, test results, or previous diagnoses</p>
            
            <div className="upload-controls">
              <button 
                className="upload-button" 
                onClick={() => fileInputRef.current.click()}
                disabled={isSubmitting}
              >
                <i className="fas fa-file-upload"></i> Select Files
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                style={{ display: 'none' }}
                disabled={isSubmitting}
              />
            </div>

            {uploadedFiles.length > 0 && (
              <div className="uploaded-files">
                <h4>Uploaded Files:</h4>
                <ul>
                  {uploadedFiles.map((file, index) => (
                    <li key={index}>
                      {file.name}
                      <button onClick={() => removeFile(index)}>Remove</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <button onClick={handleSubmit} disabled={isSubmitting}>
            Submit Symptoms
          </button>
        </>
      )}
    </div>
  );
};

export default SymptomCapturePage; 