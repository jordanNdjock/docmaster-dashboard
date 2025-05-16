import { api } from '../config';

export const getAbonnements = async (token, page, perPage) => {
  try {
    const response = await api.get('/abonnements?page=' + page + '&per_page=' + perPage, {
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
    const response = await api.post('/abonnements', abonnementData, {
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

export const ShowAbonnement = async (id, token) => {
  try {
    const response = await api.post(`/abonnements/${id}`, abonnementData, {
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
    const response = await api.put(`/abonnements/${id}`, abonnementData, {
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
    const response = await api.delete(`/abonnements/${id}`, {
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
