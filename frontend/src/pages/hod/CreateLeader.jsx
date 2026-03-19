import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../api/axiosInstance';
import useFetch from '../../utils/useFetch';
import '../../styles/dashboard.css';

const CreateLeader = () => {
  const [loading, setLoading] = useState(false);
  const { data: events } = useFetch(() => axiosInstance.get('/api/events/my-events').then(res => res.data));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: '',
    assignedEvent: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.assignedEvent) return toast.error('Please assign an event to the leader');
    
    setLoading(true);
    try {
      await axiosInstance.post('/api/auth/register', { ...formData, role: 'LEADER' });
      toast.success('Leader Account Created Successfully!');
      setFormData({ name: '', email: '', password: '', department: '', assignedEvent: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create leader');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-content">
      <h2 className="dash-title">Create Event Leader</h2>
      
      <div className="create-leader-form card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>College Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Default Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Department</label>
              <select name="department" value={formData.department} onChange={handleChange} required>
                <option value="">Select Dept</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Commerce">Commerce</option>
              </select>
            </div>
            <div className="form-group">
              <label>Assigned Event</label>
              <select name="assignedEvent" value={formData.assignedEvent} onChange={handleChange} required>
                <option value="">Select Event</option>
                {events?.map(e => (
                  <option key={e._id} value={e._id}>{e.title}</option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="btn-primary auth-submit-btn" disabled={loading}>
            {loading ? 'Creating...' : 'Create Leader Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateLeader;
