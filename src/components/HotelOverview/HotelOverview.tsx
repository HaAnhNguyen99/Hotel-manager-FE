// components/Dashboard/Dashboard.tsx
import { useHotelContext } from "../../context/HotelContext";
import StatCard from "../common/StatCard/StatCard";
import { FaBed, FaCheck, FaLock } from "react-icons/fa";
import { RoomList } from "../rooms/RoomList/RoomList";
import { MdCleaningServices } from "react-icons/md";
import LoadingText from "../common/LoadingText/LoadingText";

export const HotelOverview = () => {
  const { rooms, loading, error } = useHotelContext();

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <LoadingText />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  const stats = {
    total: rooms.length,
    occupied: rooms.filter((room) => room.room_status === "Occupied").length,
    available: rooms.filter((room) => room.room_status === "Available").length,
    cleaning: rooms.filter((room) => room.room_status === "Cleaning").length,
  };

  const statData = [
    { title: "Tổng số phòng", value: stats.total, icon: <FaBed /> },
    {
      title: "Đang sử dụng",
      value: stats.occupied,
      color: "destructive",
      icon: <FaLock />,
    },
    {
      title: "Còn trống",
      value: stats.available,
      color: "chart-2",
      icon: <FaCheck />,
    },
    {
      title: "Đang dọn dẹp",
      value: stats.cleaning,
      color: "chart-4",
      icon: <MdCleaningServices />,
    },
  ];

  return (
    <div className="p-6 bg-background">
      <h1 className="text-heading font-heading text-foreground mb-6">
        Bảng điều khiển
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {statData.map((stat, index) => (
          <StatCard key={index} {...stat} color="black" />
        ))}
      </div>
      <RoomList />
    </div>
  );
};
