"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <CurrencyProvider>{children}</CurrencyProvider>
    </AuthProvider>
  );
}
