import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, ControllerRenderProps } from "react-hook-form";
import { changePassword } from "@/services/hotelService";

const changePasswordSchema = z
  .object({
    oldPass: z.string().min(1, { message: "Mật khẩu cũ là bắt buộc" }),
    newPass: z
      .string()
      .min(6, { message: "Mật khẩu mới phải có ít nhất 6 ký tự" })
      .max(50, { message: "Mật khẩu mới phải có tối đa 50 ký tự" }),
    confirmNewPass: z
      .string()
      .min(1, { message: "Vui lòng xác nhận mật khẩu mới" }),
  })
  .refine((data) => data.newPass === data.confirmNewPass, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmNewPass"],
  })
  .refine((data) => data.newPass !== data.oldPass, {
    message: "Mật khẩu mới phải khác mật khẩu cũ",
    path: ["newPass"],
  });

type USER = z.infer<typeof changePasswordSchema>;

type PasswordInputFieldProps = {
  label: string;
  placeholder: string;
  field: ControllerRenderProps<USER, keyof USER>;
  isPeak: boolean;
  handlePeak: () => void;
  tabIndex: number;
};

const PasswordInputField = ({
  label,
  placeholder,
  field,
  isPeak,
  handlePeak,
  tabIndex,
}: PasswordInputFieldProps) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div className="flex items-center justify-between rounded-lg ring-1 ring-zinc-200 shadow-sm p-2 px-3 transition-all duration-300 ease-in-out hover:ring-zinc-600 hover:opacity-80 hover:scale-x-105">
          <input
            {...field}
            className="w-full focus:outline-none placeholder:text-zinc-400 dark:bg-transparent"
            placeholder={placeholder}
            type={isPeak ? "text" : "password"}
            tabIndex={tabIndex}
          />
          <button
            type="button"
            onClick={handlePeak}
            className="ml-2 focus:outline-none"
            aria-label={isPeak ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            tabIndex={-1}>
            {isPeak ? (
              <Eye size={18} color="black" />
            ) : (
              <EyeOff size={18} color="black" />
            )}
          </button>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

const ChangePassword = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isPeakOld, setIsPeakOld] = useState(false);
  const [isPeakNew, setIsPeakNew] = useState(false);
  const [isPeakConfirm, setIsPeakConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<USER>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPass: "",
      newPass: "",
      confirmNewPass: "",
    },
    mode: "onBlur",
  });

  const { setError, reset } = form;

  const onSubmit = async (data: USER) => {
    setIsLoading(true);
    try {
      await changePassword({
        currentPassword: data.oldPass,
        newPassword: data.newPass,
        confirmNewPassword: data.confirmNewPass,
      });
      setOpen(false);
      reset();
    } catch {
      const errorMessage = "Có lỗi xảy ra khi đổi mật khẩu";
      setError("oldPass", { type: "manual", message: errorMessage });
      setError("newPass", { type: "manual", message: errorMessage });
      setError("confirmNewPass", { type: "manual", message: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };
  console.log(open);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="outline-none">
        <RefreshCcw className="w-4 h-4" tabIndex={-1} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Đổi mật khẩu
          </DialogTitle>
          <DialogDescription className="text-center text-sm font-light">
            Đổi mật khẩu của bạn
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="oldPass"
              render={({ field }) => (
                <PasswordInputField
                  label="Mật khẩu cũ"
                  placeholder="Nhập mật khẩu cũ"
                  field={field}
                  isPeak={isPeakOld}
                  handlePeak={() => setIsPeakOld((prev) => !prev)}
                  tabIndex={1}
                />
              )}
            />
            <FormField
              control={form.control}
              name="newPass"
              render={({ field }) => (
                <PasswordInputField
                  label="Mật khẩu mới"
                  placeholder="Nhập mật khẩu mới"
                  field={field}
                  isPeak={isPeakNew}
                  handlePeak={() => setIsPeakNew((prev) => !prev)}
                  tabIndex={2}
                />
              )}
            />
            <FormField
              control={form.control}
              name="confirmNewPass"
              render={({ field }) => (
                <PasswordInputField
                  label="Xác nhận mật khẩu mới"
                  placeholder="Xác nhận mật khẩu mới"
                  field={field}
                  isPeak={isPeakConfirm}
                  handlePeak={() => setIsPeakConfirm((prev) => !prev)}
                  tabIndex={3}
                />
              )}
            />
            <DialogFooter>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full hover:bg-gray-900 hover:opacity-80 hover:scale-x-105 transition-all duration-300 ease-in-out"
                tabIndex={4}>
                {isLoading ? "Vui lòng chờ..." : "Đổi mật khẩu"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePassword;
