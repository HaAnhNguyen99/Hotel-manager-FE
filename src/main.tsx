import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { HotelProvider } from './context/HotelContext';
import { Home } from './Pages/Home/Home';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HotelProvider>
      <div className="min-h-screen bg-background">
        <Home />
      </div>
    </HotelProvider>
  </StrictMode>
);
