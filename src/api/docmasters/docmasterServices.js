import { api } from '../config';

export const getDocmasters = async (token, page, perPage) => {
  try {
    const response = await api.get('/declaration?page=' + page + '&per_page=' + perPage, {
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

export const showDocmaster = async (id) => {
    try {
      const response = await api.get(`/declaration/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network Error');
    }
  };

export const forceDeleteDocmaster = async (id) => {
    try {
      const response = await api.delete(`/declaration/${id}/force-delete`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network Error');
    }
  };