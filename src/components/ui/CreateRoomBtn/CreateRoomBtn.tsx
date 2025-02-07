import { Dialog } from '../dialog';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Room } from '@/types/hotel';
import * as React from 'react';
import { SelectService } from '../SelectService/SelectService';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { cancelBooking, createBooking, updateBooking, updateRoomStatusAvailable, updateRoomStatusOccupied } from '@/services/hotelService';
import { Spinner } from '@/components/common/Spinner/Spinner';
import { DialogClose } from '@radix-ui/react-dialog';
import { Payment } from '@/components/rooms/Payment/Payment';
import { toast } from 'sonner';
import { useHotelContext } from '@/context/HotelContext';
import { RoomStatus } from '@/types/room';
import { GuestFormSection } from '@/components/rooms/GuestFormSection/GuestFormSection';
import { RoomDetails } from '@/components/rooms/RoomDetail/RoomDetail';
import { BookingFormData, BookingType } from '@/types/booking';

export const CreateRoomBtn = ({ room, onClick }: { room: Room; onClick: () => void }) => {
  const [guestName, setGuestName] = React.useState<string>('');
  const [prepayment, setPrepayment] = useState<number | null>(null);
  const [reduction, setReduction] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [bookingID, setBookingID] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [guestCCCD, setGuestCCCD] = useState<string>('');
  const [prePayment, setPrePayment] = useState<number | null>(null);
  const { reloadRooms, rooms, setRooms, bookingForm } = useHotelContext();
  const [bookingData, setBookingData] = useState<BookingType | null>(null);
  const [checkinTime, setCheckinTime] = useState<string | null>(null);
  const [checkoutTime, setCheckoutTime] = useState<string | null>(null);

  const { control, handleSubmit, reset } = bookingForm;

  const handleBooking = async (room: Room) => {
    setIsLoading(true);
    if (room.bookings.length > 0) {
      console.log(room.bookings);
      setBookingData(room.bookings[0]);
      setIsOpen(true);
      setBookingID(room.bookings[0].documentId);
      setCheckinTime(room.bookings[0].checkin);
      setCheckoutTime(room.bookings[0].checkout);
      setIsLoading(false);
    } else {
      try {
        const payload = {
          data: {
            room: room.documentId,
            guest_name: guestName,
            booking_date: new Date().toISOString(),
            reduction: reduction,
            checkin: new Date().toISOString(),
            checkout: null,
            prepayment: prepayment,
            cccd: guestCCCD,
          },
        };
        const response = await createBooking(payload);
        console.warn('Đã đặt phòng thành công: ' + response.data);
        toast.success('Đã đặt phòng thành công');
      } catch (error) {
        console.error('Error creating booking:', error);
      } finally {
        setIsLoading(false);
        await reloadRooms();
      }
    }
  };

  const handleUpdateRoomStatus = async (room: Room) => {
    try {
      const res = await updateRoomStatusOccupied(room.documentId);
      setIsOpen(false);
      console.log(res);
    } catch (error) {
      console.error('Error updating room status:', error);
    }
  };

  const handleUpdateBooking = async (data: BookingFormData) => {
    const payload = {
      data: {
        room: room.documentId,
        guest_name: data.guestName,
        booking_date: new Date().toISOString(),
        reduction: data.reduction,
        checkin: data.checkinDate?.toISOString(),
        checkout: data.checkoutDate?.toISOString() || null,
        prepayment: data.prepayment,
        cccd: data.cccd,
      },
    };
    const originalRooms = [...rooms];

    try {
      const res = await updateBooking(bookingID, payload);
      console.log(res);
      handleUpdateRoomStatus(room);
      const updatedRooms = rooms.map((r) =>
        r.documentId === room.documentId
          ? {
              ...r,
              guest_name: data.guestName,
              booking_date: new Date().toISOString(),
              reduction: data.reduction,
              checkin: data.checkinDate?.toISOString(),
              checkout: data.checkoutDate?.toISOString() || null,
              prepayment: data.prepayment,
              cccd: data.cccd,
              room_status: RoomStatus.Occupied,
            }
          : r
      );
      setRooms(updatedRooms);
      console.log(updatedRooms);
      toast.success('Đã cập nhật phòng thành công');
    } catch (error) {
      setRooms(originalRooms);
      console.error('Error creating booking:', error);
    }
  };

  const handleOpenChange = async (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setIsLoading(true);
      try {
        await reloadRooms();
      } catch (error) {
        console.error('Error canceling booking:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCancelBooking = async () => {
    setIsOpen(false);
    setBookingID('');
    await cancelBooking(bookingID);
    await updateRoomStatusAvailable(room.documentId);
    await reloadRooms();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          className="bg-black text-white"
          variant="outline"
          onClick={() => {
            onClick();
            handleBooking(room);
          }}>
          {room.room_status === RoomStatus.Occupied ? 'Xem chi tiết' : 'Đặt phòng'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[900px] max-h-[90vh] overflow-y-scroll scrollbar-hide no-scrollbar ">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">Phòng {room.room_number}</DialogTitle>
          <DialogDescription>
            <img src={room.img.url} alt={`Room ${room.room_number}`} className="w-full h-64 object-cover shadow-md mt-2 rounded-lg mb-4" />
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
                  <form onSubmit={handleSubmit(handleUpdateBooking)} id={bookingID}>
                    <GuestFormSection control={control} bookingData={bookingData} setCheckoutTime={setCheckoutTime} setCheckinDate={setCheckinTime} />
                  </form>
                  <Separator className="my-4" />
                  <h3>Dịch vụ</h3>
                  <SelectService bookingId={bookingID} />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary" disabled={isLoading} onClick={handleCancelBooking}>
                    Hủy
                  </Button>
                </DialogClose>
                <Button type="submit" form={bookingID} disabled={isLoading}>
                  {room.room_status === RoomStatus.Occupied ? 'Cập nhật' : 'Đặt phòng'}
                </Button>
                {room.room_status === RoomStatus.Occupied && (
                  <Payment bookingId={bookingID} room={room} checkinTime={bookingData?.checkin || ''} checkoutTime={checkoutTime} />
                )}
              </DialogFooter>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
