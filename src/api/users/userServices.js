import { api } from 'api/config';

export const fetchAllUsers = async (token) => {
  try {
    const response = await api.get('/users', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export const removeUser = async (id, token) => {
  try {
    const response = await api.delete(`/users/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.date : new Error('Network Error');
  }
};