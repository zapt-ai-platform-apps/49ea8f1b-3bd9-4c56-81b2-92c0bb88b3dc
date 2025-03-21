import React from 'react';
import { AppProviders } from './AppProviders';
import { AppRoutes } from './routes';
import ZaptBadge from '@/shared/components/ZaptBadge';

/**
 * Main application component
 */
export default function App() {
  return (
    <div className="min-h-screen">
      <AppProviders>
        <AppRoutes />
      </AppProviders>
      <ZaptBadge />
    </div>
  );
}