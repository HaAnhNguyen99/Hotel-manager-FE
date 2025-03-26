import { Control, Controller } from "react-hook-form";
import {
  CheckCircleIcon,
  IdCard,
  LayoutList,
  MapPinCheckInside,
  MapPinMinusInside,
  SquareUserRound,
  TicketPercent,
} from "lucide-react";
import { DateTimePicker } from "../../ui/DateTimePicker24h/DateTimePicker24h";
import { BookingFormData } from "@/types/booking";
import { convertToISO } from "@/utils/ConvertToISO";
import RoomTypePopover from "../RoomType/RoomType";
import FormField, { FieldConfig } from "./FormField";

// Typed FieldConfig with more specific typing

export const GuestFormSection = ({
  control,
}: {
  control: Control<BookingFormData>;
}) => {
  // Typed field configurations with customInput for room type
  const fieldConfigs: Array<FieldConfig<keyof BookingFormData>> = [
    {
      name: "guestName",
      label: "Họ tên",
      icon: SquareUserRound,
      placeholder: "Họ tên",
      width: "w-3/5",
    },
    {
      name: "cccd",
      label: "CCCD",
      icon: IdCard,
      placeholder: "Nhập CCCD",
      width: "w-2/5",
    },
    {
      name: "prepayment",
      label: "Trả trước",
      icon: CheckCircleIcon,
      placeholder: "Nhập số tiền trả trước",
      type: "number",
      width: "w-2/6",
    },
    {
      name: "reduction",
      label: "Giảm giá",
      icon: TicketPercent,
      placeholder: "Nhập số tiền giảm giá",
      type: "number",
      width: "w-2/6",
    },
    {
      name: "type",
      label: "Loại phòng",
      icon: LayoutList,
      width: "w-2/6",
      customInput: (control, { onValueChange }) => (
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <RoomTypePopover
              selectedRoomType={field.value}
              setSelectedRoomType={(value) => {
                field.onChange(value);
                onValueChange?.(value);
              }}
            />
          )}
        />
      ),
    },
    {
      name: "checkinDate",
      label: "Thời gian đặt phòng",
      icon: MapPinCheckInside,
      width: "w-1/2",
      renderInput: (field, setValue) => (
        <DateTimePicker
          date={field.value ? new Date(field.value) : null}
          setDate={(date) => {
            const value =
              date && date instanceof Date
                ? convertToISO(date.toString())
                : null;
            field.onChange(value);
            setValue(value);
          }}
        />
      ),
    },
    {
      name: "checkoutDate",
      label: "Thời gian trả phòng",
      icon: MapPinMinusInside,
      width: "w-1/2",
      renderInput: (field, setValue) => (
        <DateTimePicker
          date={field.value ? new Date(field.value) : null}
          setDate={(date) => {
            const value =
              date && date instanceof Date ? date.toISOString() : null;
            field.onChange(value);
            setValue(value);
          }}
        />
      ),
    },
  ];

  return (
    <section className="space-y-4">
      <h3 className="text-center text-xl font-bold">Thông tin khách hàng</h3>

      <div className="flex gap-2">
        <FormField control={control} fieldConfig={fieldConfigs[0]} />
        <FormField control={control} fieldConfig={fieldConfigs[1]} />
      </div>

      <div className="flex gap-2 my-3">
        <FormField control={control} fieldConfig={fieldConfigs[2]} />
        <FormField control={control} fieldConfig={fieldConfigs[3]} />
        <FormField control={control} fieldConfig={fieldConfigs[4]} />
      </div>

      <div className="flex gap-2 my-4">
        <FormField control={control} fieldConfig={fieldConfigs[5]} />
        <FormField control={control} fieldConfig={fieldConfigs[6]} />
      </div>
    </section>
  );
};

export default GuestFormSection;
