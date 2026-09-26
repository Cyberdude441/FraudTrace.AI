import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api.js';

const CaseContext = createContext(null);

export function CaseProvider({ children }) {
  const [currentCaseId, setCurrentCaseId] = useState('CASE-2026-001');
  const [currentCase, setCurrentCase] = useState(null);
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCases = async () => {
    try {
      setLoading(true);
      const res = await api.getCases();
      if (res && res.cases) {
        setCases(res.cases);
        const active = res.cases.find(c => c.caseId === currentCaseId) || res.cases[0];
        if (active) setCurrentCase(active);
      }
      setError(null);
    } catch (err) {
      console.error('Failed to load cases:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, [currentCaseId]);

  const selectCase = (caseId) => {
    setCurrentCaseId(caseId);
    const found = cases.find(c => c.caseId === caseId);
    if (found) setCurrentCase(found);
  };

  const createNewCase = async (title, description) => {
    const res = await api.createCase({ title, description });
    if (res && res.case) {
      setCases(prev => [res.case, ...prev]);
      setCurrentCaseId(res.case.caseId);
      setCurrentCase(res.case);
    }
    return res;
  };

  return (
    <CaseContext.Provider value={{
      currentCaseId,
      currentCase,
      cases,
      loading,
      error,
      selectCase,
      refreshCases: fetchCases,
      createNewCase
    }}>
      {children}
    </CaseContext.Provider>
  );
}

export function useCase() {
  const ctx = useContext(CaseContext);
  if (!ctx) throw new Error('useCase must be used within a CaseProvider');
  return ctx;
}
