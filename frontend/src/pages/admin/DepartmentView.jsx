import React from 'react';
import useFetch from '../../utils/useFetch';
import axiosInstance from '../../api/axiosInstance';
import Loader from '../../components/Loader';

const DepartmentView = () => {
  const { data: depts, loading } = useFetch(() => axiosInstance.get('/api/analytics/departments').then(res => res.data));

  if (loading) return <Loader />;

  return (
    <div className="dashboard-content">
      <h2 className="dash-title">Department Management</h2>
      
      <div className="dept-grid grid-3">
        {depts?.map(dept => (
          <div key={dept.name} className="card dept-card-premium">
            <div className="dept-card-header">
              <div className="dept-icon">🏛️</div>
              <h3>{dept.name}</h3>
            </div>
            
            <div className="dept-stats-premium">
              <div className="stat-pill">
                <span className="pill-icon">📅</span>
                <div className="pill-content">
                  <span className="pill-value">{dept.eventCount}</span>
                  <span className="pill-label">Events</span>
                </div>
              </div>
              <div className="stat-pill">
                <span className="pill-icon">👥</span>
                <div className="pill-content">
                  <span className="pill-value">{dept.participantCount}</span>
                  <span className="pill-label">Participants</span>
                </div>
              </div>
            </div>

            <div className="dept-footer">
              <button className="btn-outline btn-sm">Manage HOD</button>
              <button className="btn-primary btn-sm">Analytics</button>
            </div>
          </div>
        ))}
        {!depts?.length && <p>No department data found.</p>}
      </div>
    </div>
  );
};

export default DepartmentView;
