// hooks/useFormHistory.ts
import { useState, useEffect } from 'react';

interface FormHistoryItem {
  patient_id?: string;
  name?: string;
  age?: string;
  gender?: string;
  history?: string;
  xray_name?: string;
  ref_doctor?: string;
}

const STORAGE_KEY = 'patient_form_history';
const MAX_HISTORY_ITEMS = 100;

export const useFormHistory = () => {
  const [history, setHistory] = useState<FormHistoryItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading form history:', error);
    }
  }, []);

  const addToHistory = (data: FormHistoryItem) => {
    setHistory((prev) => {
      const filtered = prev.filter(
        (item) =>
          item.patient_id !== data.patient_id || item.name !== data.name
      );
      
      const updated = [data, ...filtered].slice(0, MAX_HISTORY_ITEMS);
      
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Error saving form history:', error);
      }
      
      return updated;
    });
  };

  const getSuggestions = (field: keyof FormHistoryItem, query: string) => {
    if (!query) {
      return history
        .map((item) => item[field])
        .filter((value): value is string => typeof value === 'string' && value.trim() !== '')
        .filter((value, index, self) => self.indexOf(value) === index)
        .slice(0, 50);
    }
    
    const lowerQuery = query.toLowerCase();
    return history
      .map((item) => item[field])
      .filter((value): value is string => 
        typeof value === 'string' && 
        value.toLowerCase().includes(lowerQuery)
      )
      .filter((value, index, self) => self.indexOf(value) === index)
      .slice(0, 20);
  };

  return { history, addToHistory, getSuggestions };
};