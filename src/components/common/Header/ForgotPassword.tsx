import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { BadgeCheck } from "lucide-react";
import { forgotPassword } from "@/services/authService";

// Định nghĩa schema với Zod
const forgotPasswordSchema = z.object({
  email: z.string().email("Email không hợp lệ").min(1, "Vui lòng nhập email"),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
  });

  // Cleanup success message khi dialog đóng
  useEffect(() => {
    if (!open) {
      setSuccessMessage("");
      setServerError("");
      form.reset();
    }
  }, [open, form]);

  const onSubmit = async (data: ForgotPasswordForm) => {
    setIsLoading(true);
    setSuccessMessage("");
    setServerError("");

    try {
      const response = await forgotPassword(data.email);
      if (response.ok) {
        setSuccessMessage(
          "Vui lòng kiểm tra email của bạn để đặt lại mật khẩu"
        );
        setTimeout(() => setOpen(false), 3000);
      } else {
        setServerError("Email không tồn tại hoặc không thể gửi yêu cầu.");
      }
    } catch (error) {
      setServerError("Có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="relative text-sm font-light text-gray-900 hover:text-gray-600 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:rounded-full after:bg-gray-900 after:transition-transform after:duration-300 after:hover:scale-x-105 after:hover:opacity-80"
          aria-label="Mở dialog quên mật khẩu">
          Quên mật khẩu?
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-w-[90%] rounded-lg bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-gray-900 dark:text-white">
            Quên mật khẩu
          </DialogTitle>
          <DialogDescription className="text-center text-sm font-light text-gray-600 dark:text-gray-300">
            Nhập email để nhận liên kết đặt lại mật khẩu
          </DialogDescription>
        </DialogHeader>
        {successMessage && (
          <div className="mb-4 rounded-lg bg-green-100 p-3 text-center text-sm text-green-700">
            {successMessage}
          </div>
        )}
        {serverError && (
          <div className="mb-4 rounded-lg bg-red-100 p-3 text-center text-sm text-red-700">
            {serverError}
          </div>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            noValidate>
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-200">
                    Email
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-between rounded-lg border border-zinc-200 p-2 px-3 shadow-sm transition-all duration-300 hover:ring-1 hover:ring-zinc-400 dark:border-zinc-600 dark:hover:ring-zinc-500">
                      <input
                        {...field}
                        type="email"
                        className="w-full bg-transparent placeholder:text-zinc-400 focus:outline-none dark:bg-transparent dark:text-white dark:placeholder:text-zinc-500"
                        placeholder="Nhập email"
                        autoComplete="email"
                        aria-invalid={fieldState.error ? "true" : "false"}
                        aria-describedby={
                          fieldState.error ? "email-error" : undefined
                        }
                      />
                      {fieldState.isDirty && !fieldState.error && (
                        <BadgeCheck size={18} color="#30A167" />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage id="email-error" />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gray-900 text-white hover:bg-gray-800 hover:scale-105 transition-all duration-300 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed">
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="mr-2 h-5 w-5 animate-spin text-white"
                      viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                      />
                    </svg>
                    Vui lòng chờ...
                  </div>
                ) : (
                  "Gửi mã xác nhận"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPassword;
