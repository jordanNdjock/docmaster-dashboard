import { api } from '../config';

export const getTypeDocuments = async (token, page, perPage) => {
  try {
    const response = await api.get('/type-document?page=' + page + '&per_page=' + perPage, {
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

export const addTypeDocument = async (typeDocumentData, token) => {
  try {
    const response = await api.post('/type-document', typeDocumentData, {
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

export const showTypeDocument = async (id, token) => {
  try {
    const response = await api.get(`/type-document/${id}`, {
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

export const updateTypeDocument = async (id, typeDocumentData, token) => {
  try {
    const response = await api.put(`/type-document/${id}`, typeDocumentData, {
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

export const deleteTypeDocument = async (id, token) => {
  try {
    const response = await api.delete(`/type-document/${id}`, {
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
