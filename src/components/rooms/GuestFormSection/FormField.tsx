import { Control, Controller } from "react-hook-form";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LucideProps } from "lucide-react";
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
import { BookingFormData, RoomType } from "@/types/booking";
import { RoomBooking } from "@/types/room";
import { useHotelContext } from "@/context/HotelContext";
import { useEffect } from "react";
import { convertToISO } from "@/utils/ConvertToISO";
import RoomTypePopover from "../RoomType/RoomType";

// Typed FieldConfig with more specific typing
export interface FieldConfig<T extends keyof BookingFormData> {
  name: T;
  label: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  placeholder?: string;
  type?: string;
  width?: string;
  renderInput?: (field: any, setValue: (value: any) => void) => JSX.Element;
  customInput?: (control: Control<BookingFormData>, field: any) => JSX.Element;
}

// Generic FormField Component
const FormField = <T extends keyof BookingFormData>({
  control,
  fieldConfig,
  onValueChange,
}: {
  control: Control<BookingFormData>;
  fieldConfig: FieldConfig<T>;
  onValueChange?: (value: any) => void;
}) => (
  <div className={`flex flex-col gap-3 ${fieldConfig.width || "w-full"}`}>
    <Label className="flex gap-2 items-center">
      <fieldConfig.icon width={18} />
      {fieldConfig.label}
    </Label>

    {fieldConfig.customInput ? (
      fieldConfig.customInput(control, { onValueChange })
    ) : (
      <Controller
        name={fieldConfig.name}
        control={control}
        render={({ field }) =>
          fieldConfig.renderInput ? (
            fieldConfig.renderInput(field, onValueChange || (() => {}))
          ) : (
            <Input
              {...field}
              type={fieldConfig.type || "text"}
              placeholder={fieldConfig.placeholder}
              value={field.value ? String(field.value) : ""}
              onChange={(e) => {
                const value =
                  fieldConfig.type === "number"
                    ? Number(e.target.value)
                    : e.target.value;
                field.onChange(value);
                onValueChange?.(value);
              }}
            />
          )
        }
      />
    )}
  </div>
);

export default FormField;
