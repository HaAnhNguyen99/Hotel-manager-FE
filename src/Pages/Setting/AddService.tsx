import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BadgeCheck, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUpload from "./ImageUpload";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { createService, uploadFile } from "@/services/hotelService";
import ServiceFormFields from "./ServiceFormFields";

const serviceSchema = z.object({
  serviceName: z.string().min(1, { message: "Vui lòng nhập tên dịch vụ" }),
  price: z
    .string()
    .regex(/^\d+$/, { message: "Giá phải là số dương" })
    .transform((val) => parseInt(val, 10)),
  serviceImage: z
    .instanceof(File)
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Chỉ cho phép upload file ảnh (jpg, png, webp)"
    )
    .refine((file) => file.size <= 5 * 1024 * 1024, "File phải nhỏ hơn 5MB"),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;

const AddService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    mode: "onSubmit",
  });

  const { setError } = form;

  const onSubmit = async (data: ServiceFormData) => {
    setIsLoading(true);
    try {
      const file = data.serviceImage;
      if (!file || !(file instanceof File)) {
        throw new Error("Không có file hợp lệ được chọn");
      }

      // Upload file
      const fileId = await uploadFile(data.serviceImage);

      // Tạo service
      await createService(data, fileId);

      // Thành công
      setOpen(false);
      toast.success("Tạo dịch vụ thành công!");
      form.reset();
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = (error: unknown) => {
    const errorMessage =
      error instanceof AxiosError && error.response
        ? `Lỗi từ server: ${
            error.response.data.error?.message || error.message
          }`
        : `Lỗi: ${(error as Error).message || "Đã xảy ra lỗi"}`;

    console.error("Lỗi khi upload ảnh hoặc tạo dịch vụ:", error);
    setError("serviceImage", { message: errorMessage });
    toast.error("Đã có lỗi xảy ra khi thêm dịch vụ. Vui lòng thử lại.");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <Plus />
          <p>Dịch vụ mới</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4">
            <ServiceFormFields form={form} />
            <DialogFooter>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full hover:bg-gray-900 hover:opacity-80 hover:scale-x-105 transition-all duration-300 ease-in-out">
                {isLoading ? "Vui lòng chờ..." : "Thêm"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddService;
