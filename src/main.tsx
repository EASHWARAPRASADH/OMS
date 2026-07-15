import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './context/LanguageContext.tsx';
import { RatesProvider } from './context/RatesContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <RatesProvider>
        <App />
      </RatesProvider>
    </LanguageProvider>
  </StrictMode>,
);
