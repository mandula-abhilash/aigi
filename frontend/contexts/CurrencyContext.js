'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyContext = createContext({
  currency: 'USD',
  setCurrency: () => {},
  showCurrencyModal: false,
  setShowCurrencyModal: () => {},
  currencySymbol: '$',
});

const currencyMap = {
  US: { code: 'USD', symbol: '$' },
  IN: { code: 'INR', symbol: '₹' },
  GB: { code: 'GBP', symbol: '£' },
  EU: { code: 'EUR', symbol: '€' },
  JP: { code: 'JPY', symbol: '¥' },
  // Add more currencies as needed
};

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('USD');
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [currencySymbol, setCurrencySymbol] = useState('$');

  useEffect(() => {
    const storedCurrency = localStorage.getItem('preferredCurrency');
    if (storedCurrency) {
      const currencyData = Object.values(currencyMap).find(c => c.code === storedCurrency);
      if (currencyData) {
        setCurrency(currencyData.code);
        setCurrencySymbol(currencyData.symbol);
      }
    } else {
      detectUserCurrency();
    }
  }, []);

  const detectUserCurrency = async () => {
    try {
      const ipResponse = await axios.get('https://api.ipify.org?format=json');
      const ip = ipResponse.data.ip;
      
      // Get country from IP (using a free IP geolocation API)
      const geoResponse = await axios.get(`https://ipapi.co/${ip}/json/`);
      const countryCode = geoResponse.data.country_code;
      
      const defaultCurrency = currencyMap[countryCode] || currencyMap.US;
      
      if (!localStorage.getItem('preferredCurrency')) {
        setCurrency(defaultCurrency.code);
        setCurrencySymbol(defaultCurrency.symbol);
        setShowCurrencyModal(true);
      }
    } catch (error) {
      console.error('Failed to detect currency:', error);
      // Fallback to USD
      setCurrency('USD');
      setCurrencySymbol('$');
    }
  };

  const updateCurrency = (newCurrency) => {
    const currencyData = Object.values(currencyMap).find(c => c.code === newCurrency);
    if (currencyData) {
      setCurrency(currencyData.code);
      setCurrencySymbol(currencyData.symbol);
      localStorage.setItem('preferredCurrency', currencyData.code);
    }
  };

  return (
    <CurrencyContext.Provider 
      value={{
        currency,
        setCurrency: updateCurrency,
        showCurrencyModal,
        setShowCurrencyModal,
        currencySymbol,
        currencyMap
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}