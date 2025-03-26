import { Separator } from "@/components/ui/separator";
import { AiFillCheckCircle } from "react-icons/ai";
import { formatDateTime } from "@/utils/FormatDate";

interface BookingDetailsProps {
  checkinTime: string | null;
  checkoutTime: string;
  hours: number;
  prePayment: number;
  servicePrice: number;
  roomPrice: number;
  reduction: number;
  total: number;
}

const BookingDetails = ({
  checkinTime,
  checkoutTime,
  hours,
  prePayment,
  servicePrice,
  roomPrice,
  reduction,
  total,
}: BookingDetailsProps) => {
  return (
    <div className="flex-1">
      <h3 className="text-base text-center mb-2 font-bold">Thông tin phòng</h3>
      <p className="flex items-center justify-between">
        <span className="text-[#737373]">Giờ vào</span>
        <span className="font-bold">
          {checkinTime ? formatDateTime(checkinTime).toString() : "N/A"}
        </span>
      </p>
      <p className="flex items-center justify-between">
        <span className="text-[#737373]">Giờ ra</span>
        <span className="font-bold">
          {checkoutTime ? formatDateTime(checkoutTime).toString() : "N/A"}
        </span>
      </p>

      <Separator className="my-3" />

      <h3 className="text-base text-center mb-2 font-bold">Chi tiết</h3>
      <p className="flex items-center justify-between">
        <span className="text-[#737373]">Số giờ</span>
        <span className="font-bold">{hours || 0} tiếng</span>
      </p>
      <p className="flex items-center justify-between">
        <span className="text-[#737373]">Trả trước</span>
        <span className="font-bold">
          {(prePayment || 0).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      </p>
      <p className="flex items-center justify-between">
        <span className="text-[#737373]">Tiền dịch vụ</span>
        <span className="font-bold">
          {(servicePrice || 0).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      </p>
      <p className="flex items-center justify-between">
        <span className="text-[#737373]">Tiền phòng</span>
        <span className="font-bold">
          {(roomPrice || 0).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      </p>

      <Separator className="my-4" />

      <p className="flex items-center justify-between">
        <span className="text-[#737373]">Giảm giá</span>
        <span className="font-bold">
          {(reduction || 0).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      </p>
      <div className="flex items-center justify-between">
        <p className="text-[#737373]">Tổng cộng</p>
        <span className="text-2xl font-bold flex items-center gap-2">
          {(total || 0).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
          <AiFillCheckCircle className="text-green-500" />
        </span>
      </div>
    </div>
  );
};

export default BookingDetails;
