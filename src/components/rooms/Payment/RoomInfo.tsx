import { Room } from "@/types/hotel";

const RoomInfo = ({ room }: { room: Room }) => (
  <div className="flex-0 bg-[#d4d4d4] shadow-md shadow-slate-500 p-4 rounded-lg overflow-hidden text-white">
    <div className="rounded-lg max-h-[200px] max-w-[200px] overflow-hidden mb-3">
      <img src={room.img.url} alt={room.room_number} />
    </div>
    <div className="font-medium text-sm text-[#525252]">
      <p>
        Phòng: <span className="font-bold">{room.room_number}</span>
      </p>
      <p>
        Giờ đầu:{" "}
        <span className="font-bold">
          {Number(room.first_hourly_price).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      </p>
      <p>
        Giờ tiếp theo:{" "}
        <span className="font-bold">
          {Number(room.after_hour_price).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      </p>
    </div>
  </div>
);

export default RoomInfo;
