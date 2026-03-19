import React, { useState } from 'react';
import useFetch from '../../utils/useFetch';
import axiosInstance from '../../api/axiosInstance';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';

const ManageGames = () => {
  const { data: games, loading, execute: refresh } = useFetch(() => axiosInstance.get('/api/events/leader/games').then(res => res.data));
  const [editingId, setEditingId] = useState(null);
  const [newLimit, setNewLimit] = useState('');

  const handleUpdateLimit = async (gameId) => {
    try {
      await axiosInstance.put(`/api/events/games/${gameId}`, { limit: newLimit });
      toast.success('Limit updated');
      setEditingId(null);
      refresh();
    } catch (err) {
      toast.error('Update failed');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="dashboard-content">
      <h2 className="dash-title">Manage Games</h2>
      
      <div className="games-grid">
        {games?.map(game => (
          <div key={game._id} className="card game-manage-card">
            <div className="game-manage-header">
              <h3>{game.name}</h3>
              <span className={`badge ${game.isOpen ? 'badge-approved' : 'badge-rejected'}`}>
                {game.isOpen ? 'Open' : 'Closed'}
              </span>
            </div>
            
            <div className="game-stats-row">
              <div className="stat-box">
                <p>Registrations</p>
                <strong>{game.currentRegistrations}</strong>
              </div>
              <div className="stat-box">
                <p>Max Capacity</p>
                {editingId === game._id ? (
                  <div className="edit-limit">
                    <input 
                      type="number" 
                      value={newLimit} 
                      onChange={(e) => setNewLimit(e.target.value)}
                      className="limit-input"
                    />
                    <button onClick={() => handleUpdateLimit(game._id)}>Save</button>
                  </div>
                ) : (
                  <strong onClick={() => { setEditingId(game._id); setNewLimit(game.participantLimit); }}>
                    {game.participantLimit} ✎
                  </strong>
                )}
              </div>
            </div>

            <div className="game-actions">
              <button className="btn-secondary">Toggle Status</button>
              <button className="btn-primary">View Winners</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageGames;
