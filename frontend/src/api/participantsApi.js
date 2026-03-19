import axiosInstance from './axiosInstance';

export const registerParticipant = async (participantData) => {
  const response = await axiosInstance.post('/api/participants/register', participantData);
  return response.data;
};

export const uploadPaymentScreenshot = async (participantId, file) => {
  const formData = new FormData();
  formData.append('screenshot', file);
  const response = await axiosInstance.post(`/api/participants/upload/${participantId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const verifyPayment = async (participantId, status) => {
  const response = await axiosInstance.put(`/api/participants/verify/${participantId}`, { status });
  return response.data;
};

export const getPendingPayments = async () => {
  const response = await axiosInstance.get('/api/participants/verify');
  return response.data;
};
