import { Toaster } from "sonner";
import { Dashboard } from "../../components/Dashboard/Dashboard";
import { HotelProvider } from "@/context/HotelContext";
export const Home = () => {
  return (
    <div>
      <Toaster />
      <HotelProvider>
        <Dashboard />
      </HotelProvider>
    </div>
  );
};
