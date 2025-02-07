// components/rooms/RoomCard/RoomCard.tsx
import { formatCurrency } from '../../../utils/FormatCurrency';
import { getStatusColor } from '../../../utils/GetStatusColor';
import { ConvertRoomStatus } from '../../../utils/ConvertRoomStatus';
import { Badge } from '@/components/ui/badge';
import { CreateRoomBtn } from '@/components/ui/CreateRoomBtn/CreateRoomBtn';
import { Room } from '@/types/hotel';

interface RoomCardProps {
  room: Room;
  onClick: () => void;
}

const RoomCard = ({ room, onClick }: RoomCardProps) => {
  const imageUrl = room.img.url || '/fallback-room-image.jpg';

  return (
    <div
      className="bg-card rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105  w-[350px]"
      //   onMouseEnter={() => setIsHovered(true)}
      //   onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className="relative w-full h-full overflow-hidden">
          <img src={imageUrl} alt={room.room_number} className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-50" />

        <div className="absolute bottom-0 left-0 p-4 w-full z-10">
          <h3 className="text-white text-xl font-bold">Phòng {room.room_number}</h3>
          <div className="flex items-center justify-between mt-2">
            <p className="text-white font-semibold">
              {formatCurrency(room.price_per_night)}
              <span className="text-sm font-normal"> /đêm</span>
            </p>

            <Badge variant="outline" className={`${getStatusColor(room.room_status)} text-white text-xs px-2 py-1 rounded-full`}>
              {ConvertRoomStatus(room.room_status)}
            </Badge>
          </div>
        </div>
      </div>
      <div>
        <CreateRoomBtn room={room} onClick={onClick} />
      </div>
    </div>
  );
};

export default RoomCard;
