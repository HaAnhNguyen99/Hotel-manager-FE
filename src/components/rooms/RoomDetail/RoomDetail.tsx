// RoomDetails.tsx
import { Room } from '@/types/hotel';
import { ConvertRoomStatus } from '@/utils/ConvertRoomStatus';

export const RoomDetails = ({ room }: { room: Room }) => (
  <div>
    <h3 className="mb-2 text-xl font-bold">Chi tiết phòng</h3>
    <p>
      Trạng thái: <span className="font-bold">{ConvertRoomStatus(room.room_status)}</span>
    </p>
    <p>
      Tầng: <span className="font-bold">{room.floor}</span>
    </p>
    <p>
      Giá giờ đầu: <span className="font-bold">{room.first_hourly_price} đ/giờ</span>
    </p>
    <p>
      Giá giờ tiếp theo: <span className="font-bold">{room.after_hour_price} đ/giờ</span>
    </p>
  </div>
);
