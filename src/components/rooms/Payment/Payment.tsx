'use client';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Room } from '@/types/hotel';
import { Separator } from '@/components/ui/separator';
import { calculateHours, formatDateTime } from '@/utils/FormatDate';
import { useEffect, useState } from 'react';
import { getServiceUsage, updateBookingStatus, updateRoomStatusAvailable } from '@/services/hotelService';
import { calculateTotal } from '@/utils/calculateTotal';
import { ServiceData } from '@/types/service';
import { BookingStatus } from '@/types/booking';

type PaymentProps = {
  room: Room;
  bookingId: string;
  checkinTime: string | null;
  checkoutTime: string | null;
  prePayment: number | null;
  reduction: number | null;
};
export function Payment({ room, checkinTime, checkoutTime, bookingId, prePayment, reduction }: PaymentProps) {
  const [serviceUsage, setServiceUsage] = useState<ServiceData[]>([]);
  const [open, setOpen] = useState(false);

  const hours = checkinTime ? calculateHours(checkinTime, checkoutTime) : 0;
  const RoomPrice = (hours - 1) * Number(room.after_hour_price) + Number(room.first_hourly_price);
  const ServicePrice = calculateTotal(serviceUsage);
  const totalGeneral = RoomPrice + ServicePrice;
  const totalWithReduction = reduction ? totalGeneral - reduction : totalGeneral;
  const Total = prePayment ? prePayment - totalWithReduction : totalWithReduction;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getServiceUsage(bookingId);
      setServiceUsage(data);
    };
    fetchData();
  }, [bookingId]);

  const handleDonePayment = async () => {
    await updateRoomStatusAvailable(room.documentId);
    await updateBookingStatus(bookingId);
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Thanh toán</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-prose `">
          <DrawerHeader className="flex flex-col gap-2 items-center justify-center">
            <DrawerTitle>Thanh toán</DrawerTitle>
            <DrawerDescription>
              Thanh toán cho phòng <span className="font-bold">{room.room_number}</span>
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
                    Phòng: <span className="font-bold ">{room.room_number}</span>
                  </p>
                  <p className="text-[#525252]">
                    Giờ đầu:{' '}
                    <span className="font-bold ">
                      {Number(room.first_hourly_price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </span>
                  </p>
                  <p className="text-[#525252]">
                    Giờ tiếp theo:{' '}
                    <span className="font-bold ">
                      {Number(room.after_hour_price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </span>
                  </p>
                </div>
              </div>
              <Separator orientation="vertical" className="mx-4 w-[1px] h-[250px] my-auto bg-slate-200" />
              <div className="flex-1">
                <h3 className="text-base text-center mb-2 font-bold">Thông tin phòng</h3>
                <p className="flex items-center justify-between">
                  <span className="text-[#737373]">Giờ vào</span>
                  <span className="font-bold">{checkinTime ? formatDateTime(checkinTime).toString() : ''}</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-[#737373]">Giờ ra</span>
                  <span className="font-bold">
                    {checkoutTime ? formatDateTime(checkoutTime).toString() : formatDateTime(new Date().toISOString())}
                  </span>
                </p>

                <Separator className="my-3" />

                <h3 className="text-base text-center mb-2 font-bold">Chi tiết</h3>
                <p className="flex items-center justify-between">
                  <span className="text-[#737373]">Số giờ</span>
                  <span className="font-bold">{hours} tiếng</span>
                </p>

                <p className="flex items-center justify-between">
                  <span className="text-[#737373]">Trả trước</span>
                  <span className="font-bold">{prePayment ? prePayment.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : '0 đ'}</span>
                </p>

                <p className="flex items-center justify-between">
                  <span className="text-[#737373]">Tiền dịch vụ</span>
                  <span className="font-bold"> {ServicePrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                </p>

                <p className="flex items-center justify-between">
                  <span className="text-[#737373]">Tiền phòng</span>
                  <span className="font-bold"> {RoomPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                </p>

                <p className="flex items-center justify-between">
                  <span className="text-[#737373]">Giảm giá</span>
                  <span className="font-bold"> {reduction ? reduction.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : '0 đ'}</span>
                </p>

                <Separator className="my-4" />

                <div className="flex items-center justify-between">
                  <p className="text-[#737373]">Tổng cộng </p>
                  <span className="text-2xl font-bold">
                    {Total.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button onClick={handleDonePayment}>Hoàn tất</Button>
            <DrawerClose asChild>
              <Button variant="outline">Huỷ</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
