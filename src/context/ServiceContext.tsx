import {
  deleteService,
  getServices,
  paginationService,
  searchService,
} from "@/services/hotelService";
import { ServiceData } from "@/types/service";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
} from "react";
import { toast } from "sonner";

export type SortOption = "nameAsc" | "nameDesc" | "priceAsc" | "priceDesc";

type ServiceContextType = {
  services: ServiceData[];
  setServices: (services: ServiceData[]) => void;
  selectedService?: ServiceData | null;
  setSelectedService: (service: ServiceData | null) => void;
  sortBy: SortOption;
  setSortBy: (option: SortOption) => void;
  sortedServices: ServiceData[];
  handleDelete: (documentId: string) => Promise<void>;
  loading: boolean;
  error: Error | null;
  handleSearch: (name?: string) => Promise<void>;
  getServicesData: () => Promise<void>;
  pagination: Pagination;
  handlePaginationService: (page: number) => Promise<void>;
};

const ServiceContext = createContext<ServiceContextType>(
  {} as ServiceContextType
);

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export const ServiceProvider = ({ children }: { children: ReactNode }) => {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [selectedService, setSelectedService] = useState<ServiceData | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("nameAsc");
  const [prevServices, setPrevServices] = useState<ServiceData[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 0,
    pageSize: 0,
    pageCount: 0,
    total: 0,
  });

  // Sort services
  const sortedServices = useMemo(() => {
    if (!services || services.length === 0) return [];

    switch (sortBy) {
      case "nameAsc":
        return services.sort((a, b) => a.name.localeCompare(b.name));
      case "nameDesc":
        return services.sort((a, b) => b.name.localeCompare(a.name));
      case "priceAsc":
        return services.sort((a, b) => Number(a.price) - Number(b.price));
      case "priceDesc":
        return services.sort((a, b) => Number(b.price) - Number(a.price));
      default:
        return services;
    }
  }, [services, sortBy]);

  // Delete service
  const handleDelete = async (documentId: string) => {
    const oldService = services;
    const newService = services?.filter(
      (service) => service.documentId !== documentId
    );
    setServices(newService);
    try {
      await deleteService(documentId);
      toast.success("Dịch vụ đã xóa thành công!");
    } catch (error) {
      setServices(oldService);
      console.error("Error deleting service:", error);
    }
  };

  // Get services
  const getServicesData = async () => {
    try {
      const response = await getServices();
      setServices(response.data.data);

      // Get pagination
      const pagination = response.data.meta.pagination;
      setPagination(pagination);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };

  // Get services
  useEffect(() => {
    getServicesData();
  }, []);

  // Pagination
  const handlePaginationService = async (start: number) => {
    setLoading(true);
    try {
      const res = await paginationService(start);
      setServices(res.data);
      setPagination(res.meta.pagination);
    } catch (error) {
      console.error("Error fetching services data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Search service
  const handleSearch = async (name?: string) => {
    setPrevServices(services);

    try {
      if (!name) {
        setServices(prevServices);
        return;
      }

      const response = await searchService(name);
      setServices(response.data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  };

  return (
    <ServiceContext.Provider
      value={{
        services,
        setServices,
        selectedService,
        setSelectedService,
        sortBy,
        setSortBy,
        sortedServices,
        handleDelete,
        handleSearch,
        loading,
        error,
        getServicesData,
        pagination,
        handlePaginationService,
      }}>
      {children}
    </ServiceContext.Provider>
  );
};

export { ServiceContext };
export const useServiceContext = () => useContext(ServiceContext);
