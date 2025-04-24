import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { BadgeCheck } from "lucide-react";
import ImageUpload from "./ImageUpload";
import { ServiceFormData } from "./AddService";
import { UseFormReturn } from "react-hook-form";

interface ServiceFormFieldsProps {
  form: UseFormReturn<ServiceFormData>;
}

const ServiceFormFields = ({ form }: ServiceFormFieldsProps) => {
  const { control, setError } = form;

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
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default ServiceFormFields;
