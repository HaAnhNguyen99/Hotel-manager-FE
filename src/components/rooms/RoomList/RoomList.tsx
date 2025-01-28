import React, { useState, useContext } from 'react';
import { HotelContext } from '../../../context/HotelContext';
import RoomCard from '../RoomCard/RoomCard';

export const RoomList = () => {
  const { rooms, setSelectedRoom, setIsModalOpen } = useContext(HotelContext);
  const [filter, setFilter] = useState({ status: 'all' });

  const filteredRooms = rooms.filter((room) => {
    return filter.status === 'all' || room.room_status === filter.status;
  });
  console.log(filteredRooms);

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <select className="p-2 border rounded-lg" onChange={(e) => setFilter({ ...filter, status: e.target.value })}>
          <option value="all">All Status</option>
          <option value="Available">Available</option>
          <option value="Occupied">Occupied</option>
          <option value="Cleaning">Cleaning</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <RoomCard
            key={room.id}
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
