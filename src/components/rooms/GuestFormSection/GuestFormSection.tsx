import { Control, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DateTimePicker } from "../../ui/DateTimePicker24h/DateTimePicker24h";
import { BookingFormData } from "@/types/booking";
import { useHotelContext } from "@/context/HotelContext";
import { useEffect } from "react";
import { convertToISO } from "@/utils/ConvertToISO";
import { RoomBooking } from "@/types/room";

type GuestFormSectionProps = {
  control: Control<BookingFormData>;
  bookingData: RoomBooking | null;
  setCheckoutTime: React.Dispatch<React.SetStateAction<string | null>>;
  setCheckinDate: React.Dispatch<React.SetStateAction<string | null>>;
  setReduction: React.Dispatch<React.SetStateAction<number | null>>;
  setPrePayment: React.Dispatch<React.SetStateAction<number | null>>;
};

export const GuestFormSection = ({
  control,
  bookingData,
  setCheckoutTime,
  setCheckinDate,
  setPrePayment,
  setReduction,
}: GuestFormSectionProps) => {
  const { bookingForm } = useHotelContext();
  const { setValue } = bookingForm;

  useEffect(() => {
    if (bookingData) {
      setPrePayment(bookingData.prepayment || null);
      setValue("guestName", bookingData.guest_name || "");
      setValue("cccd", bookingData.cccd || "");
      setValue("prepayment", bookingData.prepayment || null);
      setValue("reduction", bookingData.reduction || null);
      setValue(
        "checkoutDate",
        bookingData.checkout ? convertToISO(bookingData.checkout) : null
      );
      setValue("checkinDate", bookingData.checkin ? bookingData.checkin : null);
    }
  }, [
    bookingData,
    setValue,
    setCheckoutTime,
    setCheckinDate,
    setPrePayment,
    setReduction,
  ]);

  return (
    <>
      <h3 className="text-center mb-2 text-xl font-bold">
        Thông tin khách hàng
      </h3>
      <div className="flex gap-2">
        <div className="flex flex-col gap-3 w-3/5">
          <Label>Họ tên</Label>
          <Controller
            name="guestName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Họ tên"
                value={field.value || ""}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-3 w-2/5">
          <Label>CCCD</Label>
          <Controller
            name="cccd"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Nhập CCCD"
                value={field.value || ""}
              />
            )}
          />
        </div>
      </div>

      <div className="flex gap-2 my-3">
        <div className="flex flex-col gap-3 w-2/5">
          <Label>Trả trước</Label>
          <Controller
            name="prepayment"
            control={control}
            render={({ field }) => (
              <Input
                type="number"
                {...field}
                onChange={(e) => {
                  field.onChange(Number(e.target.value));
                  setPrePayment(Number(e.target.value));
                }}
                placeholder="Nhập số tiền trả trước"
                value={field.value ? field.value.toString() : ""}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-3 w-3/5">
          <Label>Giảm giá</Label>
          <Controller
            name="reduction"
            control={control}
            render={({ field }) => (
              <Input
                type="number"
                {...field}
                placeholder="Nhập số tiền giảm giá"
                onChange={(e) => {
                  console.log(e.target.value);
                  field.onChange(Number(e.target.value));
                  setReduction(Number(e.target.value));
                }}
                value={field.value ? field.value.toString() : ""}
              />
            )}
          />
        </div>
      </div>

      <div className="flex gap-2 my-4">
        <div className="flex flex-col gap-3 w-1/2">
          <Label>Thời gian đặt phòng</Label>
          <Controller
            name="checkinDate"
            control={control}
            render={({ field }) => (
              <DateTimePicker
                date={field.value ? new Date(field.value) : null}
                setDate={(date) => {
                  field.onChange(
                    date && date instanceof Date
                      ? convertToISO(date.toString())
                      : null
                  );
                  setCheckinDate(
                    date && date instanceof Date
                      ? convertToISO(date.toString())
                      : null
                  );
                }}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-3 w-1/2">
          <Label>Thời gian trả phòng</Label>
          <Controller
            name="checkoutDate"
            control={control}
            render={({ field }) => (
              <DateTimePicker
                date={field.value ? new Date(field.value) : null}
                setDate={(date) => {
                  field.onChange(
                    date && date instanceof Date ? date.toISOString() : null
                  );
                  setCheckoutTime(
                    date && date instanceof Date ? date.toISOString() : null
                  );
                }}
              />
            )}
          />
        </div>
      </div>
    </>
  );
};
