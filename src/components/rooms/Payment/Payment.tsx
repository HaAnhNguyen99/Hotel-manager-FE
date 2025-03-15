import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Room } from "@/types/hotel";
import { Separator } from "@/components/ui/separator";
import { calculateHours, formatDateTime } from "@/utils/FormatDate";
import { useEffect, useState } from "react";
import {
  getServiceUsage,
  updateBookingStatus,
  createPayment,
  updateRoomStatusAvailable,
  getServiceUsageStatusPayed,
} from "@/services/hotelService";
import { calculateTotal } from "@/utils/calculateTotal";
import { ServiceData } from "@/types/service";
import { PaymentMethod } from "@/types/payment";
import PaymentType from "../PaymentType/PaymentType";
import { AiFillCheckCircle } from "react-icons/ai";

type PaymentProps = {
  room: Room;
  bookingId: string;
  checkinTime: string | null;
  checkoutTime: string | null;
  prePayment: number | null;
  reduction: number | null;
  setCardOpen: (open: boolean) => Promise<void>;
};
export function Payment({
  room,
  checkinTime,
  checkoutTime,
  bookingId,
  prePayment,
  reduction,
  setCardOpen,
}: PaymentProps) {
  const [serviceUsage, setServiceUsage] = useState<ServiceData[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(
    PaymentMethod.Cash
  );
  const [isLoading, setIsLoading] = useState(false);

  const hours = checkinTime ? calculateHours(checkinTime, checkoutTime) : 0;
  const RoomPrice =
    (hours - 1) * Number(room.after_hour_price) +
    Number(room.first_hourly_price);
  const ServicePrice = calculateTotal(serviceUsage);
  const totalGeneral = RoomPrice + ServicePrice;
  if (reduction) {
    reduction = Number(reduction);
  }

  if (prePayment) {
    prePayment = Number(prePayment);
  }

  const totalWithReduction =
    reduction && reduction !== 0 ? totalGeneral - reduction : totalGeneral;

  const Total =
    prePayment && prePayment > 0
      ? prePayment - totalWithReduction
      : totalWithReduction;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getServiceUsageStatusPayed(bookingId);
      setServiceUsage(data);
      console.log(data);
    };
    fetchData();
  }, [bookingId, open]);

  const handleDonePayment = async () => {
    try {
      setIsLoading(true);
      const payload = {
        data: {
          booking: bookingId,
          payment_method: selectedMethod,
          amount: Total,
          date: new Date().toISOString(),
        },
      };

      await createPayment(payload);
      await updateBookingStatus(bookingId);
      await updateRoomStatusAvailable(room.documentId);
    } catch (error) {
      console.error("Error handling payment:", error);
    } finally {
      setOpen(false);
      setCardOpen(false);
      setIsLoading(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="destructive" className="bg-blue-500 hover:bg-blue-600">
          Thanh toán
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-prose text-black">
          <DrawerHeader className="flex flex-col gap-2 items-center justify-center">
            <DrawerTitle>Thanh toán</DrawerTitle>
            <DrawerDescription>
              Thanh toán cho phòng{" "}
              <span className="font-bold">{room.room_number}</span>
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex mb-4">
              <div className="flex-0 bg-[#d4d4d4] shadow-md shadow-slate-500 p-4 rounded-lg overflow-hidden text-white">
                <div className="rounded-lg max-h-[200px] max-w-[200px] overflow-hidden mb-3">
                  <img src={room.img.url} alt={room.room_number} />
                </div>
                <div className="font-medium text-sm">
                  <p className="text-[#525252]">
                    Phòng:{" "}
                    <span className="font-bold ">{room.room_number}</span>
                  </p>
                  <p className="text-[#525252]">
                    Giờ đầu:{" "}
                    <span className="font-bold ">
                      {Number(room.first_hourly_price).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </p>
                  <p className="text-[#525252]">
                    Giờ tiếp theo:{" "}
                    <span className="font-bold ">
                      {Number(room.after_hour_price).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </p>
                </div>
              </div>
              <Separator
                orientation="vertical"
                className="mx-4 w-[1px] h-[350px] my-auto bg-slate-200"
              />
              <div className="flex-1">
                <h3 className="text-base text-center mb-2 font-bold">
                  Thông tin phòng
                </h3>
                <p className="flex items-center justify-between">
                  <span className="text-[#737373]">Giờ vào</span>
                  <span className="font-bold">
                    {checkinTime ? formatDateTime(checkinTime).toString() : ""}
                  </span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-[#737373]">Giờ ra</span>
                  <span className="font-bold">
                    {checkoutTime
                      ? formatDateTime(checkoutTime).toString()
                      : formatDateTime(new Date().toISOString())}
                  </span>
                </p>

                <Separator className="my-3" />

                <h3 className="text-base text-center mb-2 font-bold">
                  Chi tiết
                </h3>
                <p className="flex items-center justify-between">
                  <span className="text-[#737373]">Số giờ</span>
                  <span className="font-bold">{hours} tiếng</span>
                </p>

                <p className="flex items-center justify-between">
                  <span className="text-[#737373]">Trả trước</span>
                  <span className="font-bold">
                    {prePayment
                      ? prePayment.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })
                      : "0 đ"}
                  </span>
                </p>

                <p className="flex items-center justify-between">
                  <span className="text-[#737373]">Tiền dịch vụ</span>
                  <span className="font-bold">
                    {" "}
                    {ServicePrice.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </p>

                <p className="flex items-center justify-between">
                  <span className="text-[#737373]">Tiền phòng</span>
                  <span className="font-bold">
                    {" "}
                    {RoomPrice.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </p>

                <Separator className="my-4" />

                <p className="flex items-center justify-between">
                  <span className="text-[#737373]">Giảm giá</span>
                  <span className="font-bold">
                    {" "}
                    {reduction
                      ? reduction.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })
                      : "0 đ"}
                  </span>
                </p>

                <div className="flex items-center justify-between">
                  <p className="text-[#737373]">Tổng cộng</p>
                  <span className="text-2xl font-bold flex items-center gap-2">
                    {Total.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}

                    <span>
                      <AiFillCheckCircle className="text-green-500" />
                    </span>
                  </span>
                </div>

                <Separator className="my-4" />

                <div className="relative">
                  <p className="text-[#737373]">Hình thức thanh toán</p>
                  <PaymentType
                    setSelectedMethod={setSelectedMethod}
                    selectedMethod={selectedMethod}
                  />
                </div>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button onClick={handleDonePayment} disabled={isLoading}>
              {isLoading ? "Đang xử lý..." : "Hoàn tất"}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" className="text-black">
                Huỷ
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
