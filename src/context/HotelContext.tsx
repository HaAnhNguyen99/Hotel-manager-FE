// src/context/HotelContext.tsx
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { fetchRooms } from "../services/hotelService";
import { Room } from "../types/hotel";
import { UseFormReturn, useForm } from "react-hook-form";
import { BookingFormData, RoomType } from "@/types/booking";

// Define the context type
type HotelContextType = {
  rooms: Room[];
  loading: boolean;
  error: string | null;
  selectedRoom: Room | null;
  setSelectedRoom: (room: Room | null) => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  reloadRooms: () => Promise<void>;
  setRooms: (rooms: Room[]) => void;
  bookingForm: UseFormReturn<BookingFormData>;
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

  const bookingForm = useForm<BookingFormData>({
    defaultValues: {
      guestName: "",
      cccd: "",
      prepayment: null,
      reduction: null,
      checkinDate: null,
      checkoutDate: null,
      booking_date: new Date().toISOString(),
      type: RoomType.Hour,
    },
  });

  const reloadRooms = useCallback(async () => {
    try {
      const data = await fetchRooms();
      setRooms(data.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch rooms");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRooms();
        setRooms(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch rooms");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
        reloadRooms,
        setRooms,
        bookingForm,
      }}>
      {children}
    </HotelContext.Provider>
  );
};

export { HotelContext };
export const useHotelContext = () => useContext(HotelContext);
