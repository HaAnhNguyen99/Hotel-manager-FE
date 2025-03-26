// RoomDetails.tsx
import { Room } from "@/types/hotel";
import { ConvertRoomStatus } from "@/utils/ConvertRoomStatus";
import { Icon } from "@iconify-icon/react";

// Define types for detail items
interface DetailItem {
  icon: string;
  label: string;
  value: string | number;
  isStatus?: boolean;
}

// Reusable component for individual detail rows
const DetailRow = ({ icon, label, value, isStatus = false }: DetailItem) => (
  <p className="flex items-center gap-1">
    <span className="flex items-center">
      <Icon icon={icon} className="mr-1" />
      {label}
    </span>
    <span
      className={`font-bold ${
        isStatus
          ? "ml-1 p-1  shadow-md  bg-white text-green-900 rounded-lg text-[0.8rem] font-normal"
          : ""
      }`}>
      {value}
    </span>
  </p>
);

export const RoomDetails = ({ room }: { room: Room }) => {
  // Group related details into arrays for easier mapping

  const basicDetails: DetailItem[] = [
    {
      icon: "material-symbols:info-outline-rounded",
      label: "Trạng thái:",
      value: ConvertRoomStatus(room.room_status),
      isStatus: true,
    },
    {
      icon: "f7:layers-alt-fill",
      label: "Tầng:",
      value: room.floor,
    },
  ];

  const pricingDetails: DetailItem[] = [
    {
      icon: "tabler:clock-hour-4",
      label: "Giờ đầu:",
      value: `${room.first_hourly_price} đ/giờ`,
    },
    {
      icon: "tabler:clock-hour-11",
      label: "Giờ tiếp theo:",
      value: `${room.after_hour_price} đ/giờ`,
    },
    {
      icon: "material-symbols:mode-night-outline",
      label: "Qua đêm:",
      value: `${room.price_per_night} đ/giờ`,
    },
  ];

  return (
    <section className="space-y-4 text-sm">
      <h3 className="text-xl font-bold text-center">Chi tiết phòng</h3>

      {/* Basic Info Section */}
      <div className="p-2 py-4 w-full border border-[rgb(228,228,231)] rounded-2xl space-y-2 shadow-lg shadow-zinc-200">
        {basicDetails.map((detail, index) => (
          <DetailRow key={index} {...detail} />
        ))}
      </div>

      {/* Pricing Section */}
      <div className="p-2 py-4 w-full border border-[rgb(228,228,231)] rounded-2xl space-y-2 shadow-lg shadow-zinc-200">
        {pricingDetails.map((detail, index) => (
          <DetailRow key={index} {...detail} />
        ))}
      </div>
    </section>
  );
};
