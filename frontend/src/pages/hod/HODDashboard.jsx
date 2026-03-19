import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import CreateEvent from './CreateEvent';
import SESReport from './SESReport';
import CreateLeader from './CreateLeader';
import useFetch from '../../utils/useFetch';
import axiosInstance from '../../api/axiosInstance';
import Loader from '../../components/Loader';
import '../../styles/dashboard.css';

const HODOverview = () => {
  const { data: myEvents, loading } = useFetch(() => axiosInstance.get('/api/events/my-events').then(res => res.data));

  if (loading) return <Loader />;

  return (
    <div className="dashboard-content">
      <h2 className="dash-title">My Department Events</h2>
      
      <div className="events-list-table card">
        <table>
          <thead>
            <tr>
              <th>Event Title</th>
              <th>Date</th>
              <th>Status</th>
              <th>Participants</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myEvents?.length > 0 ? (
              myEvents.map(event => (
                <tr key={event._id}>
                  <td><strong>{event.title}</strong></td>
                  <td>{new Date(event.date).toLocaleDateString()}</td>
                  <td>
                    <span className={`badge badge-${event.status.toLowerCase()}`}>
                      {event.status}
                    </span>
                  </td>
                  <td>{event.participantCount || 0}</td>
                  <td>
                    <button className="btn-secondary btn-sm">Edit</button>
                    <button className="btn-primary btn-sm">Report</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No events created yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const HODDashboard = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <Routes>
          <Route index element={<HODOverview />} />
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="create-leader" element={<CreateLeader />} />
          <Route path="ses-report" element={<SESReport />} />
        </Routes>
      </main>
    </div>
  );
};

export default HODDashboard;
