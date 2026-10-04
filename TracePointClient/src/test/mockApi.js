import { vi } from 'vitest';

export const caseData = {
  caseID: 1,
  caseName: 'The Missing Prototype',
  description: 'A technology company has reported that an experimental prototype disappeared.',
  status: 'Open',
};

export const suspectsData = [
  { suspectID: 1, name: 'Alex Morgan', occupation: 'Software Developer', description: 'Developed the software.' },
  { suspectID: 2, name: 'Jamie Smith', occupation: 'Security Officer', description: 'Responsible for security.' },
  { suspectID: 3, name: 'Taylor Williams', occupation: 'Research Assistant', description: 'Worked with the research team.' },
];

const json = (body, status = 200) =>
  Promise.resolve({ ok: status >= 200 && status < 300, status, json: () => Promise.resolve(body) });

// Replaces window.fetch with a fake API. Pass `failing: true` to simulate the API being offline.
export function mockFetch({ failing = false } = {}) {
  const fn = vi.fn((url) => {
    if (failing) return Promise.reject(new TypeError('Failed to fetch'));
    if (String(url).endsWith('/cases/1')) return json(caseData);
    if (String(url).endsWith('/suspects')) return json(suspectsData);
    return json({ message: 'Not found' }, 404);
  });
  vi.stubGlobal('fetch', fn);
  return fn;
}
