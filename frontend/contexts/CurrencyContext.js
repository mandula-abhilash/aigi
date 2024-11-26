"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getIpAddress, getLocationDetails } from "@/services/api";
import CurrencyModal from "@/components/CurrencyModal";

const CurrencyContext = createContext({
  currency: "USD",
  setCurrency: () => {},
  showCurrencyModal: false,
  setShowCurrencyModal: () => {},
  currencySymbol: "$",
  currencyMap: {},
  userIp: "",
});

// Map of all supported currencies with their details
export const currencyMap = {
  IN: { code: "INR", symbol: "₹", name: "India" },
  US: { code: "USD", symbol: "$", name: "United States" },
  GB: { code: "GBP", symbol: "£", name: "United Kingdom" },
  EU: { code: "EUR", symbol: "€", name: "European Union" },
  JP: { code: "JPY", symbol: "¥", name: "Japan" },
  CN: { code: "CNY", symbol: "¥", name: "China" },
  AU: { code: "AUD", symbol: "A$", name: "Australia" },
  CA: { code: "CAD", symbol: "C$", name: "Canada" },
  BR: { code: "BRL", symbol: "R$", name: "Brazil" },
  KR: { code: "KRW", symbol: "₩", name: "South Korea" },
};

// Reverse mapping for looking up currency data by code
const currencyCodeMap = Object.entries(currencyMap).reduce(
  (acc, [country, data]) => {
    acc[data.code] = { ...data, country };
    return acc;
  },
  {}
);

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState("USD");
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [userIp, setUserIp] = useState("");

  const updateCurrencyState = (currencyCode) => {
    const currencyData = currencyCodeMap[currencyCode];
    if (currencyData) {
      setCurrency(currencyData.code);
      setCurrencySymbol(currencyData.symbol);
      localStorage.setItem("preferredCurrency", currencyData.code);
    }
  };

  const detectUserCurrency = async () => {
    try {
      // Get IP address from backend
      const ipData = await getIpAddress();
      setUserIp(ipData.ip);
      localStorage.setItem("userIp", ipData.ip);

      // Get location details from backend
      const locationData = await getLocationDetails();
      const countryCode = locationData.country;

      // Get stored currency preference
      const storedCurrency = localStorage.getItem("preferredCurrency");

      if (storedCurrency) {
        // If stored currency exists, use it
        updateCurrencyState(storedCurrency);
      } else {
        // If no stored preference, use detected country's currency or fallback to USD
        const countryData = currencyMap[countryCode];
        if (countryData) {
          console.log(
            "Detected country:",
            countryCode,
            "Setting currency to:",
            countryData.code
          );
          updateCurrencyState(countryData.code);
          setShowCurrencyModal(true);
        } else {
          console.log(
            "Country not found in mapping:",
            countryCode,
            "Falling back to USD"
          );
          updateCurrencyState("USD");
          setShowCurrencyModal(true);
        }
      }
    } catch (error) {
      console.error("Failed to detect currency:", error);
      // Fallback to USD if detection fails
      updateCurrencyState("USD");
    } finally {
      setIsInitialized(true);
    }
  };

  useEffect(() => {
    detectUserCurrency();
  }, []);

  const value = {
    currency,
    setCurrency: updateCurrencyState,
    showCurrencyModal,
    setShowCurrencyModal,
    currencySymbol,
    currencyMap,
    isInitialized,
    userIp,
  };

  // Only render children once currency is initialized
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <CurrencyContext.Provider value={value}>
      {children}
      {showCurrencyModal && (
        <CurrencyModal
          isOpen={showCurrencyModal}
          onClose={() => setShowCurrencyModal(false)}
        />
      )}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
