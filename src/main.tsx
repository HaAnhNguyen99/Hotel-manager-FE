import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Dashboard } from './components/Dashboard/Dashboard';
import { HotelProvider } from './context/HotelContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HotelProvider>
      <div className="min-h-screen bg-background">
        <Dashboard />
        {/* <RoomModal /> */}
      </div>
    </HotelProvider>
  </StrictMode>
);
