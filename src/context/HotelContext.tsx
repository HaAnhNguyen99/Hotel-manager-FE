// src/context/HotelContext.tsx
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import {
  createBooking,
  CreateBookingType,
  fetchRooms,
  updateBooking,
} from "../services/hotelService";
import { Room } from "../types/hotel";
import { UseFormReturn, useForm } from "react-hook-form";
import {
  BookingFormData,
  BookingStatus,
  BookingType,
  RoomType,
  UpdateBookingData,
} from "@/types/booking";

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
  handleCreateBooking: (roomId: string) => Promise<string>;
  handleUpdateBooking: (
    bookingId: string,
    payload: UpdateBookingData
  ) => Promise<BookingType>;
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

  const { setValue } = bookingForm;

  const reloadRooms = useCallback(async () => {
    try {
      const data = await fetchRooms();
      setRooms(data.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch rooms");
    }
  }, []);

  const handleCreateBooking = useCallback(async (roomId: string) => {
    const newPayloadData = {
      room: roomId,
      checkin: new Date().toISOString(),
      checkout: null,
      guest_name: "Vô danh",
      prepayment: 0,
      reduction: 0,
      cccd: "",
      type: RoomType.Hour,
      booking_date: new Date().toISOString(),
      booking_status: BookingStatus.Pending,
    };

    const payload = {
      data: newPayloadData,
    };

    try {
      const res = await createBooking(payload);
      const resData = res.data as BookingType;

      setValue("checkinDate", res.data.checkin);
      setValue("guestName", res.data.guest_name);
      setValue("prepayment", res.data.prepayment);
      setValue("reduction", res.data.reduction);
      setValue("type", res.data.type);

      return resData.documentId;
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Failed to create booking"
      );
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

  const handleUpdateBooking = useCallback(
    async (bookingId: string, payload: Partial<UpdateBookingData>) => {
      try {
        const response = await updateBooking(bookingId, payload);
        console.log(response.data);
        return response.data as BookingType;
      } catch (err) {
        throw new Error(
          err instanceof Error ? err.message : "Failed to update booking"
        );
      }
    },
    []
  );

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
        handleCreateBooking,
        handleUpdateBooking,
      }}>
      {children}
    </HotelContext.Provider>
  );
};

export { HotelContext };
export const useHotelContext = () => useContext(HotelContext);
