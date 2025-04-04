import { Toaster } from "sonner";
import { HotelOverview } from "../../components/HotelOverview/HotelOverview";
import { HotelProvider } from "@/context/HotelContext";
import { useUserContext } from "@/context/UserContext";
import { Navigate } from "react-router-dom";
export const Home = () => {
  const { isAuthenticated } = useUserContext();

  console.log(isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Toaster />
      <HotelProvider>
        <HotelOverview />
      </HotelProvider>
    </div>
  );
};
