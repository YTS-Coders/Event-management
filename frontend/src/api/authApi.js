import axiosInstance from './axiosInstance';

export const login = async (credentials) => {
  const response = await axiosInstance.post('/api/auth/login', credentials);
  return response.data;
};

export const registerLeader = async (leaderData) => {
  const response = await axiosInstance.post('/api/auth/register', { ...leaderData, role: 'LEADER' });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('user');
};
