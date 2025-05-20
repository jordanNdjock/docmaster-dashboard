import { api } from '../config';

export const getAbonnements = async (token, page, perPage) => {
  try {
    const response = await api.get('/abonnement?page=' + page + '&per_page=' + perPage, {
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

export const addAbonnement = async (abonnementData, token) => {
  try {
    const response = await api.post('/abonnement', abonnementData, {
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

export const updateAbonnement = async (id, abonnementData, token) => {
  try {
    const response = await api.put(`/abonnement/${id}`, abonnementData, {
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

export const deleteAbonnement = async (id, token) => {
  try {
    const response = await api.delete(`/abonnement/${id}`, {
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
