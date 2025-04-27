import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pen, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { AxiosError } from "axios";
import { toast } from "sonner";
import {
  createService,
  updateService,
  uploadFile,
} from "@/services/hotelService";
import ServiceFormFields from "./ServiceFormFields";
import { ServiceData } from "@/types/service";
import { useServiceContext } from "@/context/ServiceContext";

const serviceSchema = z.object({
  serviceName: z.string().min(1, { message: "Vui lòng nhập tên dịch vụ" }),
  price: z.preprocess(
    (val) => Number(val),
    z
      .number({ invalid_type_error: "Giá phải là số" })
      .min(1, { message: "Giá phải lớn hơn 0" })
  ),
  serviceImage: z.union([
    z
      .instanceof(File, {
        message: "Chỉ cho phép upload file ảnh (jpg, png, webp)",
      })
      .refine(
        (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
        "Chỉ cho phép upload file ảnh (jpg, png, webp)"
      )
      .refine((file) => file.size <= 5 * 1024 * 1024, "File phải nhỏ hơn 5MB"),
    z.string().url().optional(),
  ]),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;

interface ServiceProps {
  services?: ServiceData;
}

const ServiceFormDialog = ({ services }: ServiceProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (services) {
      form.reset({
        serviceName: services.name,
        price: Number(services.price),
      });
    }
  }, [services]);

  const form = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    mode: "onSubmit",
  });

  const { setError } = form;
  const { getServicesData } = useServiceContext();

  const onSubmit = async (data: ServiceFormData) => {
    setIsLoading(true);
    try {
      const file = data.serviceImage;

      // Upload file
      const fileId =
        file && file instanceof File ? await uploadFile(file) : null;

      // Tạo service
      if (services) {
        if (fileId) {
          await updateService(services.documentId, data, fileId);
        }
        await updateService(services.documentId, data);

        // Show success message
        toast.success("Cập nhật dịch vụ thành công!");
      } else {
        await createService(data, fileId);

        // Show success message
        toast.success("Tạo dịch vụ thành công!");
      }

      // Thành công
      setOpen(false);
      form.reset();
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
      getServicesData();
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
        {services ? (
          <button className="bg-white border text-neutral-500 px-4 py-2 rounded-lg flex gap-1 items-center h-10">
            <Pen className="h-4 w-4" />
          </button>
        ) : (
          <Button variant="default">
            <Plus />
            <p>Dịch vụ mới</p>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4">
            <ServiceFormFields
              form={form}
              defaultImageUrl={services?.img.url}
            />
            <DialogFooter>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full hover:bg-gray-900 hover:opacity-80 hover:scale-x-105 transition-all duration-300 ease-in-out">
                {isLoading ? "Vui lòng chờ..." : services ? "Cập nhật" : "Thêm"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceFormDialog;
