import React from 'react';
import '../../styles/dashboard.css';

const ReportPreview = ({ report, headerData }) => {
  if (!report) return (
    <div className="preview-empty card glass-card">
      <div className="empty-indicator">📜</div>
      <h3>Report Preview</h3>
      <p>Report drafting results from Gemini AI will appear here after submission.</p>
    </div>
  );

  return (
    <div className="report-preview-container card shadow-indigo">
      <div className="report-header text-center">
        <h2 className="report-title">IQAC EVENT REPORT</h2>
        <div className="report-meta">
          <p><strong>Department:</strong> {headerData.department}</p>
          <p><strong>Event:</strong> {headerData.title}</p>
          <p><strong>Date & Venue:</strong> {headerData.date ? new Date(headerData.date).toLocaleDateString() : 'TBD'} | {headerData.venue}</p>
        </div>
      </div>
      
      <div className="doc-content">
        <div className="report-body whitespace-pre-wrap">
          {report}
        </div>
      </div>
    </div>
  );
};

export default ReportPreview;
