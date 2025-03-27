import { useState, useContext } from "react";
import { HotelContext } from "../../../context/HotelContext";
import RoomCard from "../RoomCard/RoomCard";

export const RoomList = () => {
  const { rooms, setSelectedRoom, setIsModalOpen } = useContext(HotelContext);
  const [filter, setFilter] = useState({ status: "all" });

  const filteredRooms = rooms.filter((room) => {
    return filter.status === "all" || room.room_status === filter.status;
  });

  return (
    <div>
      <div className="flex gap-4 mb-6 w-fit ">
        <p className="text-lg font-bold mb-2 ml-2">Sắp xếp</p>
        <select
          className="p-2 px-4 border rounded-lg border-blue-300 border-lg "
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}>
          <option value="all">Tất cả</option>
          <option value="Available">Trống</option>
          <option value="Occupied">Có người</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
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
  );
};
