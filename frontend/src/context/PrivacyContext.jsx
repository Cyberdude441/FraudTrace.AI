import React, { createContext, useContext, useState } from 'react';
import { maskGeneric } from '../utils/privacyMask.js';

const PrivacyContext = createContext(null);

export function PrivacyProvider({ children }) {
  const [privacyEnabled, setPrivacyEnabled] = useState(false);
  const [options, setOptions] = useState({
    phones: true,
    emails: true,
    accounts: true,
    upis: true,
    names: true
  });

  const toggleGlobalPrivacy = () => {
    setPrivacyEnabled(prev => !prev);
  };

  const updateOption = (key, val) => {
    setOptions(prev => ({ ...prev, [key]: val }));
  };

  const mask = (value, type) => {
    if (!privacyEnabled) return value;
    return maskGeneric(value, type, { active: privacyEnabled, ...options });
  };

  return (
    <PrivacyContext.Provider value={{
      privacyEnabled,
      options,
      toggleGlobalPrivacy,
      updateOption,
      mask
    }}>
      {children}
    </PrivacyContext.Provider>
  );
}

export function usePrivacy() {
  const ctx = useContext(PrivacyContext);
  if (!ctx) throw new Error('usePrivacy must be used within a PrivacyProvider');
  return ctx;
}
