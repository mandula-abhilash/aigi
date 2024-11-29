// Marketplace and currency configuration data
export const marketplaceConfig = [
  {
    country_code: "US",
    marketplace: "www.amazon.com",
    currency_code: "USD",
    currency_symbol: "$",
  },
  {
    country_code: "IN",
    marketplace: "www.amazon.in",
    currency_code: "INR",
    currency_symbol: "₹",
  },
  {
    country_code: "GB",
    marketplace: "www.amazon.co.uk",
    currency_code: "GBP",
    currency_symbol: "£",
  },
];

export const currencyMap = {
  US: { code: "USD", symbol: "$", name: "United States" },
  IN: { code: "INR", symbol: "₹", name: "India" },
  GB: { code: "GBP", symbol: "£", name: "United Kingdom" },
};

// Helper functions
export function getMarketplaceData(countryCode) {
  return (
    marketplaceConfig.find((config) => config.country_code === countryCode) ||
    marketplaceConfig[0]
  );
}

export function getCurrencyData(countryCode) {
  return currencyMap[countryCode] || currencyMap.US;
}

export function getStoredMarketplaceData() {
  if (typeof window === "undefined") return null;

  const data = localStorage.getItem("marketplaceData");
  return data ? JSON.parse(data) : null;
}

export function storeMarketplaceData(data) {
  if (typeof window === "undefined") return;

  localStorage.setItem("marketplaceData", JSON.stringify(data));
}
