import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import axiosInstance from '../../api/axiosInstance';
import '../../styles/dashboard.css';

const SESReport = () => {
  const [zipFile, setZipFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  const onDrop = (acceptedFiles) => {
    setZipFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'application/zip': ['.zip'], 'application/x-zip-compressed': ['.zip'] },
    multiple: false
  });

  const handleGenerate = async () => {
    if (!zipFile) return toast.error('Please upload SES documentation (ZIP)');
    
    setLoading(true);
    const formData = new FormData();
    formData.append('sesFile', zipFile);

    try {
      const response = await axiosInstance.post('/api/ses/generate', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setReport(response.data);
      toast.success('SES Report Generated Successfully!');
    } catch (err) {
      toast.error('Failed to generate report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-content">
      <h2 className="dash-title">SES Report Generation</h2>
      
      <div className="ses-workflow-grid">
        <div className="upload-side card">
          <h3>1. Upload Documentation</h3>
          <p className="desc">Upload Invitation Letter, Feedback Forms, and Participant Lists in a single ZIP file.</p>
          
          <div {...getRootProps()} className={`dropzone ${zipFile ? 'has-file' : ''}`}>
            <input {...getInputProps()} />
            {zipFile ? (
              <div className="file-ready">
                <span className="file-icon">📦</span>
                <p><strong>{zipFile.name}</strong></p>
                <button className="change-link" onClick={(e) => { e.stopPropagation(); setZipFile(null); }}>Remove file</button>
              </div>
            ) : (
              <div className="upload-prompt">
                <span className="file-icon">☁️</span>
                <p>Drag and drop zip here, or click to browse</p>
              </div>
            )}
          </div>

          <button 
            className="btn-primary ses-generate-btn" 
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? 'Analyzing Files...' : 'Generate SES Report →'}
          </button>
        </div>

        <div className="preview-side card">
          <h3>2. Report Preview</h3>
          {report ? (
            <div className="report-preview-panel">
              <div className="preview-header">
                <h4>{report.title}</h4>
                <button className="btn-secondary btn-sm">Download PDF</button>
              </div>
              <div className="preview-body">
                <p><strong>Total Participation:</strong> {report.totalParticipants}</p>
                <p><strong>Resource Person:</strong> {report.resourcePerson}</p>
                <div className="feedback-summary">
                  <h5>Feedback Summary:</h5>
                  <p>{report.feedbackSummary}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="preview-empty">
              <p>Generation results will appear here after analysis.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SESReport;
