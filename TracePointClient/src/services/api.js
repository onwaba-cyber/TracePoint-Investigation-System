import axios from 'axios';

// REPLACE THIS WITH PERSON 1'S ACTUAL API PORT
// Check their launchSettings.json or Program.cs
const BASE_URL = 'http://localhost:7080/api'; 

/**
 * Generic GET helper to reduce repetition
 */
const get = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    // Throw a clean error message for the UI to display
    throw new Error(error.response?.data?.message || 'Failed to fetch data');
  }
};

/**
 * Fetches a single case by ID. 
 * Defaults to ID 1 as per the assignment scenario ("The Missing Prototype").
 */
export const getCase = async (id = 1) => {
  return await get(`/cases/${id}`);
};

/**
 * Fetches all suspects. Needed for Suspects Page later.
 */
export const getSuspects = async () => {
  return await get('/suspects');
};

/**
 * Fetches all evidence. Needed for Evidence Page later.
 */
export const getEvidence = async () => {
  return await get('/evidence');
};

/**
 * Submits the investigation. Needed for Part M.
 */
export const submitInvestigation = async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/investigations`, payload);
    return response.data;
  } catch (error) {
    throw new Error('Submission failed');
  }
};
