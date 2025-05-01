import {
  deleteService,
  paginationService,
  searchService,
} from "@/services/hotelService";
import { getRooms } from "@/services/roomService";
import { Rooms } from "@/types/room";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
} from "react";
import { toast } from "sonner";

export type SortOption =
  | "roomNumberAsc"
  | "roomNumberDesc"
  | "pricePerNightAsc"
  | "pricePerNightDesc"
  | "firstHourPriceAsc"
  | "firstHourPriceDesc";

type RoomsContextType = {
  rooms: Rooms[];
  setRooms: (rooms: Rooms[]) => void;
  selectedRooms?: Rooms | null;
  setSelectedRooms: (rooms: Rooms | null) => void;
  sortBy: SortOption;
  setSortBy: (option: SortOption) => void;
  sortedRooms: Rooms[];
  handleDelete: (documentId?: string) => Promise<void>;
  loading: boolean;
  error: Error | null;
  handleSearch: (name?: string) => Promise<void>;
  getRoomsData: () => Promise<void>;
  pagination: Pagination;
  handlePaginationService: (page: number) => Promise<void>;
};

const RoomsContext = createContext<RoomsContextType>({} as RoomsContextType);

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export const RoomsProvider = ({ children }: { children: ReactNode }) => {
  const [rooms, setRooms] = useState<Rooms[]>([]);
  const [selectedRooms, setSelectedRooms] = useState<Rooms | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("roomNumberAsc");
  const [prevRooms, setPrevRooms] = useState<Rooms[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 0,
    pageSize: 0,
    pageCount: 0,
    total: 0,
  });

  // Sort rooms
  const sortedRooms = useMemo(() => {
    if (!rooms || rooms.length === 0) return [];

    switch (sortBy) {
      case "roomNumberAsc":
        return rooms.sort((a, b) => a.room_number.localeCompare(b.room_number));
      case "roomNumberDesc":
        return rooms.sort((a, b) => b.room_number.localeCompare(a.room_number));
      case "pricePerNightAsc":
        return rooms.sort(
          (a, b) => Number(a.price_per_night) - Number(b.price_per_night)
        );
      case "pricePerNightDesc":
        return rooms.sort(
          (a, b) => Number(b.price_per_night) - Number(a.price_per_night)
        );
      case "firstHourPriceAsc":
        return rooms.sort(
          (a, b) => Number(a.first_hourly_price) - Number(b.first_hourly_price)
        );
      case "firstHourPriceDesc":
        return rooms.sort(
          (a, b) => Number(b.first_hourly_price) - Number(a.first_hourly_price)
        );
      default:
        return rooms;
    }
  }, [rooms, sortBy]);

  // Delete room
  const handleDelete = async (documentId?: string) => {
    if (!documentId) return;

    const oldService = rooms;
    const newService = rooms?.filter(
      (service) => service.documentId !== documentId
    );
    setRooms(newService);
    try {
      await deleteService(documentId);
      toast.success("Phòng đã xóa thành công!");
    } catch (error) {
      setRooms(oldService);
      console.error("Error deleting service:", error);
    }
  };

  // Get rooms
  const getRoomsData = async () => {
    try {
      const response = await getRooms();
      setRooms(response.data);

      // Get pagination
      const pagination = response.meta.pagination;
      setPagination(pagination);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };

  // Get rooms
  useEffect(() => {
    getRoomsData();
  }, []);

  // Pagination
  const handlePaginationService = async (start: number) => {
    setLoading(true);
    try {
      const res = await paginationService(start);
      setRooms(res.data);
      setPagination(res.meta.pagination);
    } catch (error) {
      console.error("Error fetching services data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Search room
  const handleSearch = async (name?: string) => {
    setPrevRooms(rooms);

    try {
      if (!name) {
        setRooms(prevRooms);
        return;
      }

      const response = await searchService(name);
      setRooms(response.data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  };

  return (
    <RoomsContext.Provider
      value={{
        rooms,
        setRooms,
        selectedRooms,
        setSelectedRooms,
        sortBy,
        setSortBy,
        sortedRooms,
        handleDelete,
        handleSearch,
        loading,
        error,
        getRoomsData,
        pagination,
        handlePaginationService,
      }}>
      {children}
    </RoomsContext.Provider>
  );
};

export { RoomsContext };
export const useRoomsContext = () => useContext(RoomsContext);
