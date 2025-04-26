import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { BadgeCheck } from "lucide-react";
import ImageUpload from "./ImageUpload";
import { ServiceFormData } from "./ServiceFormDialog";
import { UseFormReturn } from "react-hook-form";

interface ServiceFormFieldsProps {
  form: UseFormReturn<ServiceFormData>;
  defaultImageUrl?: string;
}

const ServiceFormFields = ({
  form,
  defaultImageUrl,
}: ServiceFormFieldsProps) => {
  const { control, setError, clearErrors } = form;

  return (
    <>
      <FormField
        control={control}
        name="serviceName"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Tên dịch vụ</FormLabel>
            <FormControl>
              <div className="flex items-center justify-between rounded-lg ring-1 ring-zinc-200 shadow-sm p-2 px-3 transition-all duration-300 ease-in-out hover:ring-zinc-600 hover:opacity-80 hover:scale-x-105">
                <input
                  {...field}
                  className="w-full bg-transparent focus:outline-none placeholder:text-zinc-400 dark:bg-transparent"
                  placeholder="Nhập tên dịch vụ"
                />
                {fieldState.isDirty && !fieldState.error && (
                  <BadgeCheck size={18} color="#30A167" />
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="price"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Giá</FormLabel>
            <FormControl>
              <div className="flex items-center justify-between rounded-lg ring-1 ring-zinc-200 shadow-sm p-2 px-3 transition-all duration-300 ease-in-out hover:ring-zinc-600 hover:opacity-80 hover:scale-x-105">
                <input
                  {...field}
                  type="number"
                  inputMode="numeric"
                  pattern="\d*"
                  className="w-full bg-transparent focus:outline-none placeholder:text-zinc-400 dark:bg-transparent"
                  placeholder="Nhập giá"
                />
                {fieldState.isDirty && !fieldState.error && (
                  <BadgeCheck size={18} color="#30A167" />
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="serviceImage"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Ảnh dịch vụ</FormLabel>
            <FormControl>
              <ImageUpload
                field={field}
                fieldState={fieldState}
                setError={setError}
                clearErrors={clearErrors}
                defaultImageUrl={defaultImageUrl}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
};

export default ServiceFormFields;
