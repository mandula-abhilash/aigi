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
  {
    country_code: "DE",
    marketplace: "www.amazon.de",
    currency_code: "EUR",
    currency_symbol: "€",
  },
  {
    country_code: "FR",
    marketplace: "www.amazon.fr",
    currency_code: "EUR",
    currency_symbol: "€",
  },
  {
    country_code: "ES",
    marketplace: "www.amazon.es",
    currency_code: "EUR",
    currency_symbol: "€",
  },
  {
    country_code: "IT",
    marketplace: "www.amazon.it",
    currency_code: "EUR",
    currency_symbol: "€",
  },
  {
    country_code: "JP",
    marketplace: "www.amazon.co.jp",
    currency_code: "JPY",
    currency_symbol: "¥",
  },
  {
    country_code: "CN",
    marketplace: "www.amazon.cn",
    currency_code: "CNY",
    currency_symbol: "¥",
  },
  {
    country_code: "AU",
    marketplace: "www.amazon.com.au",
    currency_code: "AUD",
    currency_symbol: "A$",
  },
  {
    country_code: "CA",
    marketplace: "www.amazon.ca",
    currency_code: "CAD",
    currency_symbol: "C$",
  },
  {
    country_code: "BR",
    marketplace: "www.amazon.com.br",
    currency_code: "BRL",
    currency_symbol: "R$",
  },
  {
    country_code: "MX",
    marketplace: "www.amazon.com.mx",
    currency_code: "MXN",
    currency_symbol: "$",
  },
  {
    country_code: "AE",
    marketplace: "www.amazon.ae",
    currency_code: "AED",
    currency_symbol: "د.إ",
  },
  {
    country_code: "SG",
    marketplace: "www.amazon.sg",
    currency_code: "SGD",
    currency_symbol: "S$",
  },
  {
    country_code: "NL",
    marketplace: "www.amazon.nl",
    currency_code: "EUR",
    currency_symbol: "€",
  },
  {
    country_code: "SE",
    marketplace: "www.amazon.se",
    currency_code: "SEK",
    currency_symbol: "kr",
  },
  {
    country_code: "TR",
    marketplace: "www.amazon.com.tr",
    currency_code: "TRY",
    currency_symbol: "₺",
  },
  {
    country_code: "PL",
    marketplace: "www.amazon.pl",
    currency_code: "PLN",
    currency_symbol: "zł",
  },
];

export const currencyMap = {
  US: { code: "USD", symbol: "$", name: "United States" },
  IN: { code: "INR", symbol: "₹", name: "India" },
  GB: { code: "GBP", symbol: "£", name: "United Kingdom" },
  DE: { code: "EUR", symbol: "€", name: "Germany" },
  FR: { code: "EUR", symbol: "€", name: "France" },
  ES: { code: "EUR", symbol: "€", name: "Spain" },
  IT: { code: "EUR", symbol: "€", name: "Italy" },
  JP: { code: "JPY", symbol: "¥", name: "Japan" },
  CN: { code: "CNY", symbol: "¥", name: "China" },
  AU: { code: "AUD", symbol: "A$", name: "Australia" },
  CA: { code: "CAD", symbol: "C$", name: "Canada" },
  BR: { code: "BRL", symbol: "R$", name: "Brazil" },
  MX: { code: "MXN", symbol: "$", name: "Mexico" },
  AE: { code: "AED", symbol: "د.إ", name: "United Arab Emirates" },
  SG: { code: "SGD", symbol: "S$", name: "Singapore" },
  NL: { code: "EUR", symbol: "€", name: "Netherlands" },
  SE: { code: "SEK", symbol: "kr", name: "Sweden" },
  TR: { code: "TRY", symbol: "₺", name: "Turkey" },
  PL: { code: "PLN", symbol: "zł", name: "Poland" },
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
