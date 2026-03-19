import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import ManageGames from './ManageGames';
import VerifyPayments from './VerifyPayments';
import useFetch from '../../utils/useFetch';
import axiosInstance from '../../api/axiosInstance';
import Loader from '../../components/Loader';
import '../../styles/dashboard.css';

const LeaderOverview = () => {
  const { data: stats, loading } = useFetch(() => axiosInstance.get('/api/analytics/leader').then(res => res.data));

  if (loading) return <Loader />;

  return (
    <div className="dashboard-content">
      <h2 className="dash-title">Leader Overview: {stats?.eventName}</h2>
      
      <div className="stats-grid">
        <div className="card stat-card">
          <span className="stat-icon">🎮</span>
          <div className="stat-info">
            <p>Total Games</p>
            <h3>{stats?.totalGames || 0}</h3>
          </div>
        </div>
        <div className="card stat-card">
          <span className="stat-icon">👥</span>
          <div className="stat-info">
            <p>Total Registrations</p>
            <h3>{stats?.totalRegistrations || 0}</h3>
          </div>
        </div>
        <div className="card stat-card">
          <span className="stat-icon">💰</span>
          <div className="stat-info">
            <p>Pending Verification</p>
            <h3>{stats?.pendingVerification || 0}</h3>
          </div>
        </div>
      </div>

      <div className="games-summary-section">
        <h3>Game Slots Usage</h3>
        <div className="bar-chart-container card">
          {stats?.gameStats?.map(game => (
            <div key={game.name} className="chart-item">
              <span className="dept-name">{game.name}</span>
              <div className="bar-wrapper">
                <div 
                  className="bar" 
                  style={{ 
                    width: `${(game.filled / game.limit) * 100}%`,
                    background: (game.filled / game.limit) > 0.9 ? 'var(--error)' : 'var(--success)'
                  }}
                >
                  <span className="bar-count">{game.filled}/{game.limit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const LeaderDashboard = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <Routes>
          <Route index element={<LeaderOverview />} />
          <Route path="manage-games" element={<ManageGames />} />
          <Route path="verify-payments" element={<VerifyPayments />} />
        </Routes>
      </main>
    </div>
  );
};

export default LeaderDashboard;
