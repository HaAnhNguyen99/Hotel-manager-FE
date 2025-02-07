'use client';

import * as React from 'react';
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
import { getServiceUsage, updateRoomStatusAvailable } from '@/services/hotelService';
import { calculateTotal } from '@/utils/calculateTotal';

type PaymentProps = {
  room: Room;
  bookingId: string;
  checkinTime: string;
  checkoutTime: string | null;
  prePayment: number | null;
};
export function Payment({ room, checkinTime, checkoutTime, bookingId, prePayment }: PaymentProps) {
  const [serviceUsage, setServiceUsage] = useState<ServiceUsage[]>([]);

  const hours = calculateHours(checkinTime, checkoutTime);
  const totalPrice = (hours - 1) * Number(room.after_hour_price) + Number(room.first_hourly_price);
  const totalServicePrice = calculateTotal(serviceUsage);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getServiceUsage(bookingId);
      console.log(data);
      setServiceUsage(data);
    };
    fetchData();
  }, [bookingId]);

  const handleUpdateRoomStatus = async () => {
    const res = await updateRoomStatusAvailable(room.documentId);
    console.log(res);
  };
  return (
    <Drawer>
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

                <h3 className="text-base text-center mb-2 font-bold">Chi tiết giá cả</h3>
                <p className="flex items-center justify-between">
                  <span className="text-[#737373]">Số giờ</span>
                  <span className="font-bold">{hours}</span>
                </p>

                <p className="flex items-center justify-between">
                  <span className="text-[#737373]">Trả trước</span>
                  <span className="font-bold">{}</span>
                </p>

                <p className="flex items-center justify-between">
                  <span className="text-[#737373]">Tiền dịch vụ</span>
                  <span className="font-bold"> {totalServicePrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                </p>

                <p className="flex items-center justify-between">
                  <span className="text-[#737373]">Tiền phòng</span>
                  <span className="font-bold"> {totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                </p>
                <Separator className="my-4" />
                <div className="flex items-center justify-between">
                  <p className="text-[#737373]">Tổng cộng </p>
                  <span className="text-2xl font-bold">
                    {(totalPrice + totalServicePrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button onClick={handleUpdateRoomStatus}>Hoàn tất</Button>
            <DrawerClose asChild>
              <Button variant="outline">Huỷ</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
