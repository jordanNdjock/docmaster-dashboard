import { api } from '../config';

export const getTransactions = async (token, page, perPage) => {
  try {
    const response = await api.get('/transaction?page=' + page + '&per_page=' + perPage, {
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