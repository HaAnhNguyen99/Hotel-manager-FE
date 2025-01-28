// components/rooms/RoomCard/RoomCard.tsx
import { Room, RoomType } from '../../../types/hotel';
import { formatCurrency } from '../../../utils/FormatCurrency';
import { getStatusColor } from '../../../utils/GetStatusColor';

type RoomCardProps = {
  room: Room;
  onClick: () => void;
};

const RoomCard = ({ room, onClick }: RoomCardProps) => {
  console.log(room);
  const imageUrl = room.img.url || '/fallback-room-image.jpg';

  return (
    <div className="bg-card rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105" onClick={onClick}>
      <div>
        <img
          src={imageUrl}
          alt={`Phòng ${room.room_number}`}
          className="w-full h-48 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/fallback-room-image.jpg';
          }}
        />
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Phòng {room.room_number}</h3>
            <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(room.room_status)}`}>{room.room_status}</span>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Tầng: {room.floor}</p>
            <p className="text-lg font-bold text-primary">{formatCurrency(room.price_per_night)}/Đêm</p>
          </div>
        </div>
      </div>
      <div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg">Đặt phòng</button>
      </div>
    </div>
  );
};

export default RoomCard;
