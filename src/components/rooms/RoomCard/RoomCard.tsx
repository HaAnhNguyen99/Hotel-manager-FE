import "./RoomCard.css";
import { formatCurrency } from "../../../utils/FormatCurrency";
import { getStatusColor } from "../../../utils/GetStatusColor";
import { ConvertRoomStatus } from "../../../utils/ConvertRoomStatus";
import { Badge } from "@/components/ui/badge";
import { CreateRoomBtn } from "@/components/ui/CreateRoomBtn/CreateRoomBtn";
import { Room } from "@/types/hotel";

interface RoomCardProps {
  room: Room;
  onClick: () => void;
}

const RoomCard = ({ room, onClick }: RoomCardProps) => {
  const imageUrl = room.img.url || "/fallback-room-image.jpg";

  return (
    <div className="rooms-card bg-card relative shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 w-[350px] aspect-[5/3] flex flex-col  border-2 border-black rounded-3xl">
      <div className="relative flex-1 w-full h-full overflow-hidden">
        <div
          id="img-overlay-img"
          className="absolute opacity-0 top-0 left-0 w-full h-full backdrop-brightness-90 bg-black/30 z-10"></div>
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={imageUrl}
            alt={room.room_number}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-50" />

        <div className="absolute bottom-0 left-0 p-4 w-full h-full z-10 flex justify-between">
          <div
            id="img-overlay-text"
            className="absolute opacity-0 top-0 left-0 w-full h-full backdrop-brightness-75 bg-black/30 z-10"></div>
          <div className="self-end">
            <h3 className="text-white text-xl font-bold">
              Phòng {room.room_number}
            </h3>
            <p className="text-white font-semibold">
              {formatCurrency(room.price_per_night)}
              <span className="text-sm font-normal"> /đêm</span>
            </p>
          </div>

          <div className="flex items-center justify-between mt-2 h-fit self-start">
            <Badge
              variant="outline"
              className={
                "text-black text-xs card-shadow px-2 py-1 rounded-full flex gap-2 items-center bg-white dark:text-black font-light"
              }>
              <div
                className={`w-2 h-2 rounded-full ${getStatusColor(
                  room.room_status
                )}`}></div>
              <p>{ConvertRoomStatus(room.room_status)}</p>
            </Badge>
          </div>
        </div>
      </div>
      <div
        id="create-room-btn"
        className="opacity-0 z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300">
        <CreateRoomBtn room={room} onClick={onClick} />
      </div>
    </div>
  );
};

export default RoomCard;
