"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { AnalyticsProvider } from "@/components/providers/AnalyticsProvider";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <CurrencyProvider>
        <AnalyticsProvider>{children}</AnalyticsProvider>
      </CurrencyProvider>
    </AuthProvider>
  );
}
