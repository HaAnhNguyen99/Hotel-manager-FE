// src/context/HotelContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { fetchRooms } from '../services/hotelService';
import { Room, RoomType } from '../types/hotel';

// Define the context type
type HotelContextType = {
  rooms: Room[];
  loading: boolean;
  error: string | null;
  selectedRoom: Room | null;
  setSelectedRoom: (room: Room | null) => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
};

// Create the context
const HotelContext = createContext<HotelContextType>({} as HotelContextType);

// Create the provider component
export const HotelProvider = ({ children }: { children: ReactNode }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const data = await fetchRooms();
        setRooms(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch rooms');
      } finally {
        setLoading(false);
      }
    };

    loadRooms();
  }, []);

  return (
    <HotelContext.Provider
      value={{
        rooms,
        loading,
        error,
        selectedRoom,
        setSelectedRoom,
        isModalOpen,
        setIsModalOpen,
      }}>
      {children}
    </HotelContext.Provider>
  );
};

export { HotelContext };
export const useHotelContext = () => useContext(HotelContext);
