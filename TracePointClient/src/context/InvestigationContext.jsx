import { createContext, useContext, useMemo, useState } from 'react';

const InvestigationContext = createContext(null);

// Holds the suspect chosen on the Suspects page (React state, Parts J and Q)
// so that the Investigation page (Persons 4 and 5) can read it later.
export function InvestigationProvider({ children }) {
  const [selectedSuspect, setSelectedSuspect] = useState(null);

  const value = useMemo(
    () => ({ selectedSuspect, setSelectedSuspect }),
    [selectedSuspect]
  );

  return (
    <InvestigationContext.Provider value={value}>
      {children}
    </InvestigationContext.Provider>
  );
}

export function useInvestigation() {
  const ctx = useContext(InvestigationContext);
  if (!ctx) {
    throw new Error('useInvestigation must be used inside <InvestigationProvider>');
  }
  return ctx;
}
