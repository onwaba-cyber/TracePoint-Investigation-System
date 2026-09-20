// Person 5 - Frontend/API Integration
// This file is the ONLY place React talks to the backend.
// Pages/components must import functions from here, never fetch() directly,
// and never hard-code case/suspect/evidence data.

// TODO: replace with the real API URL from Person 1 (e.g. https://localhost:7285/api)
const API_BASE_URL = "https://localhost:7285/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    // let the calling page show a friendly error / loading state
    throw new Error(`API error ${response.status} on ${path}`);
  }

  // some endpoints (e.g. 204) return no body
  if (response.status === 204) return null;
  return response.json();
}

export const getCases = () => request("/cases");
export const getCaseById = (id) => request(`/cases/${id}`);

export const getSuspects = () => request("/suspects");
export const getSuspectById = (id) => request(`/suspects/${id}`);

export const getEvidence = () => request("/evidence");
export const getEvidenceById = (id) => request(`/evidence/${id}`);

export const submitInvestigation = (data) =>
  request("/investigations", {
    method: "POST",
    body: JSON.stringify(data),
  });

// Dapper endpoint (Person 1): investigations + suspect names
export const getInvestigationsWithSuspectNames = () =>
  request("/investigations/with-suspects");
