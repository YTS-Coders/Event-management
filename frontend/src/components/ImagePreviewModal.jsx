import React from 'react';

const ImagePreviewModal = ({ isOpen, onClose, imageUrl, participantName, participantEmail, onApprove, onReject }) => {
  if (!isOpen) return null;

  return (
    <div className="preview-overlay-v2" onClick={onClose}>
      <div className="preview-card-v2" onClick={e => e.stopPropagation()}>
        <div className="preview-header-v2">
          <h3>Payment Proof Preview</h3>
          <button className="close-fab" onClick={onClose}>✕</button>
        </div>
        
        <div className="preview-body-v2">
          <img src={imageUrl} alt="Payment Proof" className="full-proof-img" />
        </div>

        <div className="preview-footer-v2">
          <div className="preview-info">
            <span className="label">Participant</span>
            <span className="value">{participantName}</span>
            <span className="text-sm text-light">{participantEmail}</span>
          </div>
          
          <div className="preview-btns">
            <button className="btn-reject-v2" onClick={() => { onReject(); onClose(); }}>Reject</button>
            <button className="btn-approve-v2" onClick={() => { onApprove(); onClose(); }}>Approve</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePreviewModal;
