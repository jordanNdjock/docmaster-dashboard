import { api } from 'api/config';

export const fetchAllUsers = async (token, page, perPage) => {
  try {
    const response = await api.get('/users?page=' + page + '&per_page=' + perPage, {
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

export const updateUser = async (id, userData, token) => {
  try {
    const response = await api.put(`/users/${id}`, userData, {
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

export const blockUser = async (id, token) => {
  try {
    const response = await api.post(`/users/${id}/block`, {}, {
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

export const restoreUser = async (id, token) => {
  try {
    const response = await api.post(`/users/${id}/restore`, {}, {
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