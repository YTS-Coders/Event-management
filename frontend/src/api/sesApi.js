import axiosInstance from './axiosInstance';

export const uploadSESFiles = async (formData) => {
  const response = await axiosInstance.post('/api/ses/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const generateSESReport = async (eventId) => {
  const response = await axiosInstance.post('/api/ses/generate', { eventId });
  return response.data;
};
