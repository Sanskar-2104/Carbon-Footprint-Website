import axios from 'axios';
import { apiUrl } from '../config/api';

export const calculateEmission = async (payload) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const res = await axios.post(apiUrl('/api/carbon/calculate'), payload, { headers });
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error('Bad Request');
    }
    throw error;
  }
};

export const getHistory = async () => {
  try {
    const token = localStorage.getItem('token');
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const res = await axios.get(apiUrl('/api/carbon/history'), { headers });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getSummary = async () => {
  try {
    const token = localStorage.getItem('token');
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const res = await axios.get(apiUrl('/api/carbon/summary'), { headers });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const saveResult = async (payload) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const res = await axios.post(apiUrl('/api/carbon/save'), payload, { headers });
    return res.data;
  } catch (error) {
    throw error;
  }
};
