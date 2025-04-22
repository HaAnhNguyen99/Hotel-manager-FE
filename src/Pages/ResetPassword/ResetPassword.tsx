import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BadgeCheck } from "lucide-react";
import { resetPassword } from "@/services/authService";
import { useUserContext } from "@/context/UserContext";

// Định nghĩa schema với Zod
const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .regex(/[A-Z]/, "Yêu cầu ít nhất một chữ hoa")
      .regex(/[a-z]/, "Yêu cầu ít nhất một chữ thường")
      .regex(/[0-9]/, "Yêu cầu ít nhất một số"),
    confirmPassword: z.string().min(1, "Vui lòng nhập mật khẩu xác nhận"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get("code");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const { loginUser } = useUserContext();

  const onSubmit = async (data: ResetPasswordForm) => {
    if (!code) {
      setServerError("Token không hợp lệ. Vui lòng kiểm tra lại liên kết.");
      return;
    }
    setLoading(true);
    try {
      const response = await resetPassword({
        code,
        password: data.newPassword,
        passwordConfirmation: data.confirmPassword,
      });
      setSuccess(
        "Đặt lại mật khẩu thành công! Chuyển hướng đến trang đăng nhập..."
      );
      const {
        jwt,
        user: { username, email },
      } = response;

      loginUser(jwt, username, email, true);
      setTimeout(() => navigate("/home"), 3000);
    } catch (err) {
      if (err instanceof Error) {
        const errorMessage = err.message;
        setServerError(errorMessage || "Có lỗi xảy ra. Vui lòng thử lại sau.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Đặt Lại Mật Khẩu
        </h2>
        {serverError && (
          <p className="text-red-500 text-center mb-4 bg-red-100 p-2 rounded">
            {serverError}
          </p>
        )}
        {success && (
          <p className="text-green-500 text-center mb-4 bg-green-100 p-2 rounded">
            {success}
          </p>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* New Password */}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-200">
                    Mật khẩu mới
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-between rounded-lg border border-zinc-200 p-2 px-3 shadow-sm transition-all duration-300 hover:ring-1 hover:ring-zinc-400 dark:border-zinc-600 dark:hover:ring-zinc-500">
                      <input
                        {...field}
                        type="password"
                        className="w-full bg-transparent placeholder:text-zinc-400 focus:outline-none dark:bg-transparent dark:text-white dark:placeholder:text-zinc-500"
                        placeholder="Nhập mật khẩu mới"
                        aria-invalid={fieldState.error ? "true" : "false"}
                        aria-describedby={
                          fieldState.error ? "newpass-err" : undefined
                        }
                      />
                      {fieldState.isDirty && !fieldState.error && (
                        <BadgeCheck size={18} color="#30A167" />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage id="newpass-err" />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-200">
                    Nhập lại mật khẩu mới
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-between rounded-lg border border-zinc-200 p-2 px-3 shadow-sm transition-all duration-300 hover:ring-1 hover:ring-zinc-400 dark:border-zinc-600 dark:hover:ring-zinc-500">
                      <input
                        {...field}
                        type="password"
                        className="w-full bg-transparent placeholder:text-zinc-400 focus:outline-none dark:bg-transparent dark:text-white dark:placeholder:text-zinc-500"
                        placeholder="Nhập lại mật khẩu mới"
                        aria-invalid={fieldState.error ? "true" : "false"}
                        aria-describedby={
                          fieldState.error ? "confirm-newpass-err" : undefined
                        }
                      />
                      {fieldState.isDirty && !fieldState.error && (
                        <BadgeCheck size={18} color="#30A167" />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage id="confirm-newpass-err" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-900 p-2 rounded-md text-white hover:bg-gray-800 hover:scale-105 transition-all duration-300 ease-in-out">
                {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
