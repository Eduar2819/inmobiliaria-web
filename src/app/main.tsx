import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import '@ds/styles/global.css';
import { LocaleProvider } from '@shared/i18n/LocaleProvider';
import { LandingPage } from './LandingPage';

// The living style guide ships as its own chunk and only loads on /design-system.
const DesignSystemPage = lazy(() => import('@ds/docs/DesignSystemPage'));
const isDocs = window.location.pathname.replace(/\/+$/, '').endsWith('/design-system');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocaleProvider>
      {isDocs ? (
        <Suspense fallback={null}>
          <DesignSystemPage />
        </Suspense>
      ) : (
        <LandingPage />
      )}
    </LocaleProvider>
  </StrictMode>,
);
