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

  const updateCurrencyState = (countryCode, ip) => {
    const marketplaceData = getMarketplaceData(countryCode);
    const currencyData = getCurrencyData(countryCode);

    setCurrency(currencyData.code);
    setCurrencySymbol(currencyData.symbol);
    setMarketplace(marketplaceData.marketplace);
    setUserIp(ip);

    const data = {
      countryCode,
      marketplace: marketplaceData.marketplace,
      currencyCode: currencyData.code,
      currencySymbol: currencyData.symbol,
      userIp: ip,
    };

    storeMarketplaceData(data);
  };

  const detectUserLocation = async () => {
    try {
      const storedData = getStoredMarketplaceData();
      const ipData = await getIpAddress();
      const currentIp = ipData.ip;

      if (!storedData || storedData.userIp !== currentIp) {
        const locationData = await getLocationDetails();
        const countryCode = locationData.country;
        updateCurrencyState(countryCode, currentIp);
        setShowCurrencyModal(true);
      } else {
        setCurrency(storedData.currencyCode);
        setCurrencySymbol(storedData.currencySymbol);
        setMarketplace(storedData.marketplace);
        setUserIp(storedData.userIp);
      }
    } catch (error) {
      console.error("Failed to detect location:", error);
      updateCurrencyState("US", "");
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
        updateCurrencyState(countryCode, userIp);
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
