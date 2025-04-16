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
import { Link, useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { BadgeCheck, Eye, EyeOff, User } from "lucide-react";
import { useState } from "react";
import { login } from "@/services/authService";
import { useUserContext } from "@/context/UserContext";

const userSchema = z.object({
  identifier: z.string().min(1, { message: "Tên đăng nhập là bắt buộc" }),
  password: z.string().max(50, { message: "Mật khẩu phải có tối đa 50 ký tự" }),
});

type USER = z.infer<typeof userSchema>;

const Login = () => {
  const [isPeak, setIsPeak] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { loginUser } = useUserContext();

  const handlePeak = () => setIsPeak((prev) => !prev);

  const form = useForm<USER>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
    mode: "onBlur",
  });

  const { setError } = form;

  const onSubmit = async (data: USER) => {
    setIsLoading(true);
    try {
      const response = await login(data);
      const {
        jwt,
        user: { username, email },
      } = response;
      loginUser(jwt, username, email, rememberMe);
      navigate("/home");
    } catch {
      const errorMessage = "Sai tên đăng nhập hoặc mật khẩu";
      setError("identifier", { type: "manual", message: errorMessage });
      setError("password", { type: "manual", message: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="p-3 bg-landing rounded-lg hover:bg-black hover:opacity-80 hover:text-white hover:scale-x-105 transition-all duration-300 ease-in-out font-semibold dark:border dark:border-white text-[#d4af37] sm:p-2 sm:border sm:!border-landing-bgBlack">
          <span className="hidden sm:block border-landing-bgBlack text-white">
            Đăng nhập
          </span>
          <User className="sm:hidden w-4 h-4 text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-w-72 rounded-lg bg-landing">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Đăng nhập
          </DialogTitle>
          <DialogDescription className="text-center text-sm font-light">
            Đăng nhập để trải nghiệm trang web
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Tên đăng nhập</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-between rounded-lg ring-1 ring-zinc-200 shadow-sm p-2 px-3 transition-all duration-300 ease-in-out hover:ring-zinc-600 hover:opacity-80 hover:scale-x-105 ">
                      <input
                        {...field}
                        className="w-full focus:outline-none placeholder:text-zinc-400 dark:bg-transparent"
                        placeholder="Nhập tên đăng nhập"
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
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-between rounded-lg ring-1 ring-zinc-200 shadow-sm p-2 px-3 transition-all duration-300 ease-in-out hover:ring-zinc-600 hover:opacity-80 hover:scale-x-105">
                      <input
                        {...field}
                        className="w-full focus:outline-none placeholder:text-zinc-400 dark:bg-transparent"
                        placeholder="Nhập mật khẩu"
                        type={isPeak ? "text" : "password"}
                      />
                      <button
                        type="button"
                        onClick={handlePeak}
                        className="ml-2 focus:outline-none"
                        aria-label={isPeak ? "Ẩn mật khẩu" : "Hiện mật khẩu"}>
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
              )}
            />
            <div className="flex justify-between">
              <div className="flex items-center gap-1">
                <Checkbox
                  id="terms"
                  className="w-4 h-4"
                  checked={rememberMe}
                  onCheckedChange={(checked) => {
                    if (checked !== "indeterminate") {
                      setRememberMe(checked);
                    }
                  }}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Ghi nhớ
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="relative text-sm font-light after:w-full after:absolute after:content-[''] after:bg-gray-900 after:-bottom-[1.5px] after:left-0 after:h-[1.5px] after:rounded-full after:transition-all after:duration-300 after:ease-in-out hover:after:opacity-40 hover:after:scale-x-105">
                Quên mật khẩu?
              </Link>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full hover:bg-gray-900 hover:opacity-80 hover:scale-x-105 transition-all duration-300 ease-in-out">
                {isLoading ? "Vui lòng chờ..." : "Đăng nhập"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
