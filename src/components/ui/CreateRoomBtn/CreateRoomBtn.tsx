import { Dialog } from "../dialog";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Room } from "@/types/hotel";
import { SelectService } from "../SelectService/SelectService";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import {
  cancelBooking,
  createBooking,
  getRoomBooking,
  updateBooking,
  updateRoomStatusAvailable,
  updateRoomStatusOccupied,
} from "@/services/hotelService";
import { Spinner } from "@/components/common/Spinner/Spinner";
import { DialogClose } from "@radix-ui/react-dialog";
import { Payment } from "@/components/rooms/Payment/Payment";
import { toast } from "sonner";
import { useHotelContext } from "@/context/HotelContext";
import { RoomBooking, RoomStatus } from "@/types/room";
import { GuestFormSection } from "@/components/rooms/GuestFormSection/GuestFormSection";
import { RoomDetails } from "@/components/rooms/RoomDetail/RoomDetail";
import { BookingFormData, BookingStatus } from "@/types/booking";
import { convertToISO } from "@/utils/ConvertToISO";
import CancelBookingPopover from "@/components/rooms/CancelBookingPopover/CancelBookingPopover";

export const CreateRoomBtn = ({
  room,
  onClick,
}: {
  room: Room;
  onClick: () => void;
}) => {
  const [reduction, setReduction] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [bookingID, setBookingID] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [prePayment, setPrePayment] = useState<number | null>(null);
  const { reloadRooms, bookingForm } = useHotelContext();
  const [bookingData, setBookingData] = useState<RoomBooking | null>(null);
  const [checkinTime, setCheckinTime] = useState<string | null>(null);
  const [checkoutTime, setCheckoutTime] = useState<string | null>(null);
  const { setValue, control, handleSubmit, reset } = bookingForm;

  const handleBooking = async (room: Room) => {
    setIsLoading(true);
    const roomBooking = await getRoomBooking(room.documentId);
    if (roomBooking) {
      setBookingData(roomBooking);
      setIsOpen(true);
      setBookingID(roomBooking.documentId);
      setCheckinTime(roomBooking.checkin);
      setCheckoutTime(roomBooking.checkout);
      setPrePayment(roomBooking.prepayment);
      setReduction(roomBooking.reduction);
      setIsLoading(false);
    } else {
      handleCreateBooking(room);
    }
  };

  const handleCreateBooking = async (room: Room) => {
    try {
      const payload = {
        data: {
          room: room.documentId,
          booking_date: new Date().toISOString(),
          checkin: new Date().toISOString(),
          booking_status: BookingStatus.Pending,
          guest_name: "Vô danh",
          prepayment: 0,
          reduction: 0,
        },
      };
      console.log(payload);
      const res = await createBooking(payload);

      setBookingID(res.data.documentId);
      setValue("checkinDate", payload.data.checkin);
      setValue("guestName", payload.data.guest_name);
      setValue("prepayment", payload.data.prepayment);
      setValue("reduction", payload.data.reduction);
      toast.success("Đã đặt phòng thành công");
    } catch (error) {
      console.error("Error creating booking:", error);
    } finally {
      setIsLoading(false);
      await updateRoomStatusOccupied(room.documentId);
    }
  };

  const handleUpdateRoomStatus = async (room: Room) => {
    try {
      await updateRoomStatusOccupied(room.documentId);
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating room status:", error);
    }
  };

  const handleUpdateBooking = async (data: BookingFormData) => {
    const payload = {
      data: {
        room: room.documentId,
        guest_name: data.guestName,
        booking_date: new Date().toISOString(),
        reduction: data.reduction,
        checkin: data.checkinDate
          ? convertToISO(data.checkinDate.toString())
          : null,
        checkout: data.checkoutDate
          ? convertToISO(data.checkoutDate.toString())
          : null,
        prepayment: data.prepayment,
        cccd: data.cccd,
      },
    };

    try {
      const res = await updateBooking(bookingID, payload);
      console.log(res);
      handleUpdateRoomStatus(room);

      toast.success("Đã cập nhật phòng !");
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  const handleOpenChange = async (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setIsLoading(true);
      try {
        await reloadRooms();
      } catch (error) {
        console.error("Error canceling booking:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCancelBooking = async () => {
    try {
      setIsLoading(true);
      setBookingID("");
      await cancelBooking(bookingID);
      await updateRoomStatusAvailable(room.documentId);
      await reloadRooms();
      reset();
      setPrePayment(null);
      setReduction(null);
    } catch (error) {
      console.error("Error canceling booking:", error);
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          className="bg-primary text-white font-bold hover:bg-[#986ab7]/40"
          variant="outline"
          onClick={() => {
            onClick();
            handleBooking(room);
          }}>
          {room.room_status === RoomStatus.Occupied
            ? "Xem chi tiết"
            : "Đặt phòng"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[900px] max-h-[90vh] overflow-y-scroll scrollbar-hide no-scrollbar ">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Phòng {room.room_number}
          </DialogTitle>
          <DialogDescription>
            <img
              src={room.img.url}
              alt={`Room ${room.room_number}`}
              loading="lazy"
              className="w-full h-64 object-cover shadow-md mt-2 rounded-lg mb-4"
            />
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Spinner />
          </div>
        ) : (
          <div>
            <div>
              <div className="grid grid-cols-3 gap-4 py-4">
                <RoomDetails room={room} />

                <div className="col-span-2">
                  <form
                    onSubmit={handleSubmit(handleUpdateBooking)}
                    id={bookingID}>
                    <GuestFormSection
                      control={control}
                      bookingData={bookingData}
                      setCheckoutTime={setCheckoutTime}
                      setCheckinDate={setCheckinTime}
                      setPrePayment={setPrePayment}
                      setReduction={setReduction}
                    />
                  </form>
                  <Separator className="my-4" />
                  <SelectService bookingId={bookingID} />
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <CancelBookingPopover
                    handleCancelBooking={handleCancelBooking}
                  />
                </DialogClose>
                <Button type="submit" form={bookingID} disabled={isLoading}>
                  {room.room_status === RoomStatus.Occupied
                    ? "Cập nhật"
                    : "Đặt phòng"}
                </Button>
                {room.room_status === RoomStatus.Occupied && (
                  <Payment
                    bookingId={bookingID}
                    room={room}
                    checkinTime={checkinTime}
                    checkoutTime={checkoutTime}
                    prePayment={prePayment}
                    reduction={reduction}
                    setIsOpen={handleOpenChange}
                  />
                )}
              </DialogFooter>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
