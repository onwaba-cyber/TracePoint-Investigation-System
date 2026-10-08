import axios from 'axios';

// CONFIRM PORT WITH PERSON 1. Default is often 5000 or 7xxx.
const BASE_URL = 'http://localhost:7080/api'; 

// Generic GET helper
const get = async (endpoint) => {
  const response = await axios.get(`${BASE_URL}${endpoint}`);
  return response.data;
};

// --- CASES (Part I) ---
export const getCases = () => get('/cases');
export const getCaseById = (id) => get(`/cases/${id}`);

// --- SUSPECTS (Part J) ---
export const getSuspects = () => get('/suspects');
export const getSuspectById = (id) => get(`/suspects/${id}`);

// --- EVIDENCE (Part K) ---
export const getEvidenceList = () => get('/evidence');
export const getEvidenceById = (id) => get(`/evidence/${id}`);

// --- INVESTIGATION (Part M) ---
export const submitInvestigation = (payload) => {
  // Payload shape: { caseId, suspectId, conclusion }
  return axios.post(`${BASE_URL}/investigations`, payload);
};
