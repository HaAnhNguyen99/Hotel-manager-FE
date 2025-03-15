import { Toaster } from "sonner";
import { HotelOverview } from "../../components/HotelOverview/HotelOverview";
import { HotelProvider } from "@/context/HotelContext";
export const Home = () => {
  return (
    <div>
      <Toaster />
      <HotelProvider>
        <HotelOverview />
      </HotelProvider>
    </div>
  );
};
