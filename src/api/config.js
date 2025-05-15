import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/admin';

export const fileBaseUrl = 'http://127.0.0.1:8000';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
});
