"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const RecordContext = createContext<any>(null);

export const RecordProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedRecord, setSelectedRecord] = useState<any>(() => {
    if (typeof window !== 'undefined') {
      // Initialize state from local storage or default to null
      const storedRecord = localStorage.getItem('selectedRecord');
      return storedRecord ? JSON.parse(storedRecord) : null;
    }
    return null;
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && selectedRecord) {
      // Store selectedRecord in local storage whenever it changes
      localStorage.setItem('selectedRecord', JSON.stringify(selectedRecord));
    } else if (typeof window !== 'undefined') {
      localStorage.removeItem('selectedRecord');
    }
  }, [selectedRecord]);

  return (
    <RecordContext.Provider value={{ selectedRecord, setSelectedRecord }}>
      {children}
    </RecordContext.Provider>
  );
};

export const useRecord = () => useContext(RecordContext);
