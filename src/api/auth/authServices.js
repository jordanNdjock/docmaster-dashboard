import { api } from '../config';

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export const logout = async (token) => {
  try {
    const result = await api.post(
      '/auth/logout',
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );
    return result.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};
