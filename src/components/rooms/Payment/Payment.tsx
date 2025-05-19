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

import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import {
  createPayment,
  updateRoomStatusAvailable,
  getServiceUsageStatusPayed,
  updateBookingStatusAndCheckOut,
} from "@/services/hotelService";
import PaymentDropdown from "./PaymentDropdown";
import { useHotelContext } from "@/context/HotelContext";
import { calculatePriceDetails } from "@/utils/calculatePriceDetails";
import RoomInfo from "./RoomInfo";
import BookingDetails from "./BookingDetails";
import { PaymentMethod, PaymentProps, PriceDetails } from "./types";
import { UpdateServiceUsagePayload } from "@/types/service_usage";

const Payment = ({ room, bookingId, setCardOpen }: PaymentProps) => {
  const [serviceUsage, setServiceUsage] = useState<UpdateServiceUsagePayload[]>(
    []
  );
  const [open, setOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(PaymentMethod.Cash);
  const [isLoading, setIsLoading] = useState(false);
  const { bookingForm } = useHotelContext();
  const { getValues } = bookingForm;

  const priceDetails: PriceDetails = calculatePriceDetails(
    room,
    serviceUsage,
    getValues
  );

  useEffect(() => {
    const fetchServiceUsage = async () => {
      const data = await getServiceUsageStatusPayed(bookingId);
      setServiceUsage(data);
    };
    fetchServiceUsage();
  }, [bookingId, open]);

  const handleDonePayment = async () => {
    try {
      setIsLoading(true);
      const payload = {
        data: {
          booking: bookingId,
          payment_method: selectedMethod,
          amount: priceDetails.total,
          date: new Date().toISOString(),
        },
      };

      await createPayment(payload);

      await updateBookingStatusAndCheckOut(bookingId);
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
        <Button
          variant="destructive"
          className="bg-blue-500 dark:bg-bg-blue-700 hover:bg-blue-600">
          Thanh toán
        </Button>
      </DrawerTrigger>
      <DrawerContent className="dark:bg-sidebar">
        <div className="mx-auto w-full max-w-prose text-black">
          <DrawerHeader className="flex flex-col gap-2 items-center justify-center dark:text-white">
            <DrawerTitle>Thanh toán</DrawerTitle>
            <DrawerDescription>
              Thanh toán cho phòng{" "}
              <span className="font-bold">{room.room_number}</span>
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0 dark:text-white">
            <div className="flex mb-4">
              <RoomInfo room={room} />
              <Separator
                orientation="vertical"
                className="mx-4 w-[1px] h-[350px] my-auto bg-slate-200"
              />
              <div>
                <BookingDetails
                  checkinTime={getValues("checkinDate")}
                  checkoutTime={
                    getValues("checkoutDate") || new Date().toISOString()
                  }
                  {...priceDetails}
                />
                <Separator
                  orientation="horizontal"
                  className="my-4 w-full bg-slate-200"
                />
                <p className="text-[#737373]">Hình thức thanh toán</p>
                <PaymentDropdown
                  setSelectedMethod={setSelectedMethod}
                  selectedMethod={selectedMethod}
                />
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button onClick={handleDonePayment} disabled={isLoading}>
              {isLoading ? "Đang xử lý..." : "Hoàn tất"}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" className="text-black dark:text-white">
                Huỷ
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default Payment;
