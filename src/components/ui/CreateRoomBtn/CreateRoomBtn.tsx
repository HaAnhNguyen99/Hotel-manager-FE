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
import {
  BookingFormData,
  BookingStatus,
  CreateBookingPayload,
  RoomType,
} from "@/types/booking";
import { convertToISO } from "@/utils/ConvertToISO";
import CancelPopover from "@/components/rooms/CancelPopover/CancelPopover";

export const CreateRoomBtn = ({
  room,
  onClick,
}: {
  room: Room;
  onClick: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bookingID, setBookingID] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { reloadRooms, bookingForm, handleUpdateBooking, handleCreateBooking } =
    useHotelContext();
  const { setValue, control, handleSubmit, reset, getValues } = bookingForm;

  const handleBooking = async (room: Room) => {
    setIsLoading(true);
    const roomBooking = await getRoomBooking(room.documentId);
    if (roomBooking) {
      setBookingID(roomBooking.documentId);
      setIsOpen(true);
      setValue("checkinDate", roomBooking.checkin);
      setValue("guestName", roomBooking.guest_name);
      setValue("prepayment", roomBooking.prepayment);
      setValue("reduction", roomBooking.reduction);
      setValue("type", roomBooking.type);
      setValue(
        "checkoutDate",
        roomBooking.checkout ? convertToISO(roomBooking.checkout) : null
      );
      setIsLoading(false);
    } else {
      onCreateBooking(room);
    }
  };

  const onCreateBooking = async (room: Room) => {
    try {
      const bookingId = await handleCreateBooking(room.documentId);
      setBookingID(bookingId);

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

  const onUpdate = async (data: BookingFormData) => {
    const bookingData = {
      room: room.documentId,
      checkin: getValues("checkinDate"),
      checkout: getValues("checkoutDate"),
      guest_name: data.guestName,
      prepayment: Number(data.prepayment),
      reduction: Number(data.reduction),
      cccd: data.cccd,
      type: getValues("type"),
    };

    const payload = {
      data: bookingData,
    };

    try {
      setIsLoading(true);
      await handleUpdateRoomStatus(room);
      await handleUpdateBooking(bookingID, payload);

      toast.success("Đã cập nhật phòng !");
    } catch (error) {
      console.error("Error creating booking:", error);
    } finally {
      setIsLoading(false);
      await reloadRooms();
      setIsOpen(false);
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
      <DialogContent className="sm:max-w-[425px] md:max-w-[900px] max-h-[90vh] overflow-y-scroll scrollbar-hide no-scrollbar bg-background">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold sticky -top-5 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] left-0 bg-[rgb(2,0,36)] bg-[linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(240,128,128,1) 35%, rgba(0,212,255,0) 100%);] z-10 p-2 rounded-lg ">
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
              <div className="grid grid-cols-3 gap-10 py-4">
                <RoomDetails room={room} />

                <div className="col-span-2">
                  <form onSubmit={handleSubmit(onUpdate)} id={bookingID}>
                    <GuestFormSection control={control} />
                  </form>
                  <Separator className="my-4" />
                  <SelectService bookingId={bookingID} />
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <CancelPopover
                    cancelFunction={handleCancelBooking}
                    title="Huỷ đặt phòng"
                    description="Bạn có chắc chắn muốn huỷ đặt phòng?"
                    buttonVariant="destructive"
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
                    setCardOpen={handleOpenChange}
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
