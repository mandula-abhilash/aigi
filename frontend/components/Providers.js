'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { CurrencyProvider } from '@/contexts/CurrencyContext';
import { Toaster } from '@/components/ui/toaster';

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <CurrencyProvider>
        {children}
        <Toaster />
      </CurrencyProvider>
    </AuthProvider>
  );
}