"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getIpAddress, getLocationDetails } from "@/services/api";
import {
  getMarketplaceData,
  getCurrencyData,
  getStoredMarketplaceData,
  storeMarketplaceData,
} from "@/lib/marketplace";
import CurrencyModal from "@/components/CurrencyModal";

const CurrencyContext = createContext({
  currency: "USD",
  setCurrency: () => {},
  showCurrencyModal: false,
  setShowCurrencyModal: () => {},
  currencySymbol: "$",
  currencyMap: {},
  userIp: "",
  marketplace: "",
});

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState("USD");
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [marketplace, setMarketplace] = useState("Amazon.com");
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [userIp, setUserIp] = useState("");

  const updateCurrencyState = (countryCode) => {
    const marketplaceData = getMarketplaceData(countryCode);
    const currencyData = getCurrencyData(countryCode);

    setCurrency(currencyData.code);
    setCurrencySymbol(currencyData.symbol);
    setMarketplace(marketplaceData.marketplace);

    const data = {
      countryCode,
      marketplace: marketplaceData.marketplace,
      currencyCode: currencyData.code,
      currencySymbol: currencyData.symbol,
      userIp,
    };

    storeMarketplaceData(data);
  };

  const detectUserLocation = async () => {
    try {
      // Get IP address
      const ipData = await getIpAddress();
      setUserIp(ipData.ip);

      // Get location details
      const locationData = await getLocationDetails();
      const countryCode = locationData.country;

      // Get stored data
      const storedData = getStoredMarketplaceData();

      if (storedData) {
        // If stored data exists but country changed, update everything
        if (storedData.countryCode !== countryCode) {
          updateCurrencyState(countryCode);
          setShowCurrencyModal(true);
        } else {
          // Use stored data
          setCurrency(storedData.currencyCode);
          setCurrencySymbol(storedData.currencySymbol);
          setMarketplace(storedData.marketplace);
        }
      } else {
        // No stored data, set defaults based on detected country
        updateCurrencyState(countryCode);
        setShowCurrencyModal(true);
      }
    } catch (error) {
      console.error("Failed to detect location:", error);
      // Fallback to US
      updateCurrencyState("US");
      setShowCurrencyModal(true);
    } finally {
      setIsInitialized(true);
    }
  };

  useEffect(() => {
    detectUserLocation();
  }, []);

  const value = {
    currency,
    setCurrency: (currencyCode) => {
      const countryCode = Object.keys(getCurrencyData()).find(
        (key) => getCurrencyData(key).code === currencyCode
      );
      if (countryCode) {
        updateCurrencyState(countryCode);
      }
    },
    showCurrencyModal,
    setShowCurrencyModal,
    currencySymbol,
    currencyMap: getCurrencyData(),
    isInitialized,
    userIp,
    marketplace,
  };

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
