import {api} from '../config';

export const getAllStatistics = async (token) => {
  try {
    const response = await api.get('/stats', {
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