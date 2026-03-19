import axiosInstance from './axiosInstance';

export const getDepartments = async () => {
  const response = await axiosInstance.get('/departments');
  return response.data;
};

export const createDepartment = async (deptData) => {
  const response = await axiosInstance.post('/departments', deptData);
  return response.data;
};

export const updateDepartment = async (id, deptData) => {
  const response = await axiosInstance.put(`/departments/${id}`, deptData);
  return response.data;
};

export const deleteDepartment = async (id) => {
  const response = await axiosInstance.delete(`/departments/${id}`);
  return response.data;
};
