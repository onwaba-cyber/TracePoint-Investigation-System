import axios from 'axios';

// 1. Get the port from Person 1. Do not guess.
const BASE_URL = 'http://localhost:5000/api'; 

// 2. Export EXACTLY what Member 3 imports.
export const getCase = async () => {
  // Assignment says "View THE case" (singular scenario).
  // Hardcoding ID 1 is acceptable here IF the backend only seeds one case.
  // Better: Ask Person 1 if there's a specific endpoint like /api/cases/current
  try {
    const response = await axios.get(`${BASE_URL}/cases/1`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || 'Failed to load case');
  }
};

export const getSuspects = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/suspects`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to load suspects');
  }
};

export const getEvidence = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/evidence`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to load evidence');
  }
};

export const submitInvestigation = async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/investigations`, payload);
    return response.data;
  } catch (error) {
    throw new Error('Submission failed');
  }
};
