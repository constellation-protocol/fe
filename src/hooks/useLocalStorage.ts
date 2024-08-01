import { useState } from 'react';

// Define a generic type for the hook
type StorageType<T> = T | string;

const  useLocalStorage = <T>(key: string, initialValue: StorageType<T>) => {
  // Get the initial value from localStorage or use the provided initial value
  const [storedValue, setStoredValue] = useState<StorageType<T>>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Function to save the value to localStorage
  const setValue = (value: StorageType<T>) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Function to remove the item from localStorage
  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeItem] as const;
}

export default useLocalStorage;