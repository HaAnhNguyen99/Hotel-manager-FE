import { Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DateTimePicker } from '../../ui/DateTimePicker24h/DateTimePicker24h';
import { BookingFormData } from '@/types/booking';
import { useHotelContext } from '@/context/HotelContext';

export const GuestFormSection = ({ control }: { control: Control<BookingFormData> }) => {
  const { bookingForm } = useHotelContext();
  const { setValue } = bookingForm;

  return (
    <>
      <h3 className="text-center mb-2 text-xl font-bold">Thông tin khách hàng</h3>
      <div className="flex gap-2">
        <div className="flex flex-col gap-3 w-3/5">
          <Label>Họ tên</Label>
          <Controller name="guestName" control={control} render={({ field }) => <Input {...field} placeholder="Họ tên" />} />
        </div>
        <div className="flex flex-col gap-3 w-2/5">
          <Label>CCCD</Label>
          <Controller name="cccd" control={control} render={({ field }) => <Input {...field} placeholder="Nhập CCCD" />} />
        </div>
      </div>

      <div className="flex gap-2 my-3">
        <div className="flex flex-col gap-3 w-2/5">
          <Label>Trả trước</Label>
          <Controller
            name="prepayment"
            control={control}
            render={({ field }) => (
              <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} placeholder="Nhập số tiền trả trước" />
            )}
          />
        </div>
        <div className="flex flex-col gap-3 w-3/5">
          <Label>Giảm giá</Label>
          <Controller
            name="reduction"
            control={control}
            render={({ field }) => <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />}
          />
        </div>
      </div>

      <div className="flex gap-2 my-4">
        <div className="flex flex-col gap-3 w-1/2">
          <Label>Thời gian đặt phòng</Label>
          <Controller name="checkinDate" control={control} render={({ field }) => <DateTimePicker date={field.value} setDate={field.onChange} />} />
        </div>
        <div className="flex flex-col gap-3 w-1/2">
          <Label>Thời gian trả phòng</Label>
          <Controller name="checkoutDate" control={control} render={({ field }) => <DateTimePicker date={field.value} setDate={field.onChange} />} />
        </div>
      </div>
    </>
  );
};
