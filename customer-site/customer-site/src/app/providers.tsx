'use client';

import { AuthProvider } from './context/AuthContext';
import { ReactNode } from 'react';

// This component will wrap all client-side providers
export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}