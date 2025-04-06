// components/Dashboard/Dashboard.tsx
import { useHotelContext } from "../../context/HotelContext";

import { RoomList } from "../rooms/RoomList/RoomList";
import LoadingText from "../common/LoadingText/LoadingText";
import ErrorPage from "../common/ErrorPage";

export const HotelOverview = () => {
  const { loading, error } = useHotelContext();

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <LoadingText />
      </div>
    );
  if (error) return <ErrorPage error={error} />;

  return (
    <div className="p-6 bg-background">
      <h1 className="relative text-heading font-heading text-foreground mb-6 after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-20 after:h-[3px] after:bg-primary">
        Bảng điều khiển
      </h1>

      <RoomList />
    </div>
  );
};
