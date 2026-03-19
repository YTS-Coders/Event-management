import React, { useState } from 'react';
import useFetch from '../../utils/useFetch';
import { getPendingEvents, approveEvent, rejectEvent } from '../../api/eventsApi';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';

const PendingEvents = () => {
  const { data: events, loading, execute: refresh } = useFetch(getPendingEvents);
  const [rejectingId, setRejectingId] = useState(null);
  const [reason, setReason] = useState('');

  const handleApprove = async (id) => {
    try {
      await approveEvent(id);
      toast.success('Event Approved Successfully');
      refresh();
    } catch (err) {
      toast.error('Approval failed');
    }
  };

  const handleRejectSubmit = async () => {
    if (!reason) return toast.error('Please provide a reason');
    try {
      await rejectEvent(rejectingId, reason);
      toast.success('Event Rejected');
      setRejectingId(null);
      setReason('');
      refresh();
    } catch (err) {
      toast.error('Rejection failed');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="dashboard-content">
      <h2 className="dash-title">Pending Approvals</h2>
      
      {events && events.length > 0 ? (
        <div className="pending-grid underline-details">
          {events.map(event => (
            <div key={event._id} className="card pending-card-premium">
              <div className="pending-card-header">
                <span className="dept-badge">{event.department}</span>
                <span className="date-badge">
                  {new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                </span>
              </div>
              
              <div className="pending-card-body">
                <h4>{event.title}</h4>
                <p className="description-snippet">{event.description?.substring(0, 80)}...</p>
                
                <div className="detail-row">
                  <span className="detail-label">Posted By:</span>
                  <span className="detail-value">{event.hodName || 'Department HOD'}</span>
                </div>
              </div>

              <div className="pending-card-footer">
                <button 
                  className="btn-approve-circle" 
                  onClick={() => handleApprove(event._id)}
                  title="Approve Event"
                >
                  ✓
                </button>
                <button 
                  className="btn-reject-circle" 
                  onClick={() => setRejectingId(event._id)}
                  title="Reject Event"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state card">
          <p>No events currently awaiting approval.</p>
        </div>
      )}

      {rejectingId && (
        <div className="modal-overlay glass-morphism">
          <div className="card modal-card-premium">
            <div className="modal-header-caution">
              <span className="modal-icon">⚠️</span>
              <h3>Reject Event Application</h3>
            </div>
            <div className="modal-body">
              <p>Please provide a specific reason for rejection. This will be sent as a notification to the HOD.</p>
              <textarea 
                value={reason} 
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g., Missing budget details, Date conflict..."
                className="premium-textarea"
                autoFocus
              />
            </div>
            <div className="modal-footer-premium">
              <button onClick={() => setRejectingId(null)} className="btn-ghost">Back</button>
              <button onClick={handleRejectSubmit} className="btn-reject-full">Confirm Rejection</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingEvents;
