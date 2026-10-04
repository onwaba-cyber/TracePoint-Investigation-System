// Minimal API helper so the pages can load data from the ASP.NET Core API.
// NOTE: Person 5 (API Integration) owns this file and may extend it
// (e.g. submitInvestigation, better error handling). Keep the exported
// function names below so the pages keep working.

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'https://localhost:7080/api'
).replace(/\/+$/, '');

// The case that is being investigated (seeded in the database with CaseID = 1).
export const DEFAULT_CASE_ID = 1;

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: { Accept: 'application/json', ...(options.headers || {}) },
    });
  } catch {
    throw new Error(
      'Could not reach the TracePoint API. Please make sure the API is running and try again.'
    );
  }

  if (!response.ok) {
    let message = `The server responded with an error (${response.status}).`;
    try {
      const body = await response.json();
      if (body && typeof body.message === 'string') message = body.message;
    } catch {
      // response had no JSON body - keep the default message
    }
    throw new Error(message);
  }

  return response.json();
}

export const getCase = (id = DEFAULT_CASE_ID) => request(`/cases/${id}`);
export const getSuspects = () => request('/suspects');
export const getEvidence = () => request('/evidence');
