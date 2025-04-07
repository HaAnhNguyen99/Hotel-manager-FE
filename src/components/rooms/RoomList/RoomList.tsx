import { useState, useContext } from "react";
import { HotelContext } from "../../../context/HotelContext";
import RoomCard from "../RoomCard/RoomCard";
import { FaBed, FaCheck, FaLock } from "react-icons/fa";
import StatCard from "@/components/common/StatCard/StatCard";
import { Room } from "@/types/hotel";

export const RoomList = () => {
  const { rooms, setSelectedRoom, setIsModalOpen } = useContext(HotelContext);
  const [filter, setFilter] = useState({ status: "all" });

  const stats = {
    total: rooms.length,
    occupied: rooms.filter((room) => room.room_status === "Occupied").length,
    available: rooms.filter((room) => room.room_status === "Available").length,
    cleaning: rooms.filter((room) => room.room_status === "Cleaning").length,
  };

  const statData = [
    { title: "Tất cả", value: stats.total, icon: <FaBed />, status: "all" },
    {
      title: "Có người",
      value: stats.occupied,
      icon: <FaLock />,
      status: "Occupied",
    },
    {
      title: "Trống",
      value: stats.available,
      icon: <FaCheck />,
      status: "Available",
    },
  ];

  const filteredRooms: Room[] = rooms.filter((room) => {
    return filter.status === "all" || room.room_status === filter.status;
  });

  // console.log(filteredRooms);

  const roomsByFloor: { [key: number]: Room[] } = filteredRooms.reduce(
    (acc: { [key: number]: Room[] }, room: Room) => {
      const floor = room.floor;
      if (!acc[floor]) {
        acc[floor] = [];
      }
      acc[floor].push(room);
      return acc;
    },
    {}
  );

  console.log(roomsByFloor);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 w-fit transition-all duration-300">
        {statData.map((stat, index) => (
          <StatCard
            key={index}
            {...stat}
            isSelected={filter.status === stat.status}
            onClick={() => setFilter({ status: stat.status })}
          />
        ))}
      </div>

      <div className="space-y-10">
        {Object.keys(roomsByFloor).map((floor) => (
          <div key={floor} className="space-y-10">
            <div className="flex gap-2 items-center">
              <div className="rounded-xl h-10 w-3 bg-primary"></div>
              <h2 className="text-2xl font-bold ">Tầng {floor}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {roomsByFloor[Number(floor)].map((room) => (
                <RoomCard
                  key={room.documentId}
                  room={room}
                  onClick={() => {
                    setSelectedRoom(room);
                    setIsModalOpen(true);
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
