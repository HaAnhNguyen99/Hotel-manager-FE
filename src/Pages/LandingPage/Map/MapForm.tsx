import { FieldErrors, useForm, UseFormRegister } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContact } from "@/services/landingpageService";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên"),
  sdt: z.string().min(8, "Số điện thoại không hợp lệ"),
  message: z.string().min(1, "Vui lòng nhập nội dung"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const className =
  "w-full border-b outline-none bg-transparent focus-within:bg-transparent visited:bg-transparent border-landing-bgBlack focus:outline-none";

interface InputFormProps {
  label: string;
  name: keyof ContactFormData;
  placeholder?: string;
  type?: string;
  register: UseFormRegister<{
    name: string;
    sdt: string;
    message: string;
  }>;
  errors: FieldErrors<{
    name: string;
    sdt: string;
    message: string;
  }>;
}
interface TextAreaFormProps {
  register: UseFormRegister<{
    name: string;
    sdt: string;
    message: string;
  }>;
  errors: FieldErrors<{
    name: string;
    sdt: string;
    message: string;
  }>;
}
export const InputForm = ({
  label,
  name,
  placeholder,
  type = "string",
  register,
  errors,
}: InputFormProps) => {
  return (
    <div className="mb-2">
      <label htmlFor="name" className="text-brown-yellow mb-2 block">
        {label}
      </label>
      <input
        {...register(name)}
        className={className}
        type={type}
        id={name}
        placeholder={placeholder}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm">{errors[name]?.message}</p>
      )}
    </div>
  );
};
export const TextAreaForm = ({ register, errors }: TextAreaFormProps) => {
  return (
    <div className="mb-2">
      <label htmlFor="message" className="text-brown-yellow mb-2 block">
        Lời nhắn
      </label>
      <textarea
        {...register("message")}
        className={`${className} resize-none`}
        id="message"
        rows={4}
      />
      {errors.message && (
        <p className="text-red-500 text-sm">{errors.message.message}</p>
      )}
    </div>
  );
};

const MapForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await createContact(data);
      toast.success("Gửi thành công!", {
        description:
          "Chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.",
      });
      reset();
    } catch (error) {
      console.error("Lỗi gửi:", error);
      toast.error("Gửi không thành công!, vui lòng thử lại sau.", {
        description: "Có lỗi xảy ra.",
      });
      alert("Có lỗi xảy ra.");
    }
  };

  return (
    <div className="w-full hidden lg:block absolute left-1/4 z-10 shadow-md top-10 right-0 lg:w-4/5 -translate-x-20 bg-landing-primaryLight py-16 -translate-y-[11%] pl-[27%] pr-10 lg:h-[27.4rem]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:flex lg:flex-col lg:items-start lg:justify-start lg:p-0  text-landing lg:*:w-full lg:w-full lg:h-full lg:pl-10">
        <InputForm
          label="Họ tên"
          name="name"
          register={register}
          errors={errors}
        />
        <InputForm
          label="Số điện thoại"
          name="sdt"
          type="tel"
          register={register}
          errors={errors}
        />
        <TextAreaForm register={register} errors={errors} />
        <div className="px-8 mt-3">
          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full shadow-md group active:scale-95 mx-auto py-3 p-2 bg-white text-brown-yellow mt-4 flex justify-center gap-5 items-center px-8 text-lg">
            <span>{isSubmitting ? "Đang gửi..." : "Gửi"}</span>
            <svg
              className="group-hover:translate-x-3 transition-all duration-300 ease-in-out"
              xmlns="http://www.w3.org/2000/svg"
              width="101"
              height="16"
              viewBox="0 0 101 16"
              fill="none">
              <path
                d="M100.707 8.70711C101.097 8.31658 101.097 7.68342 100.707 7.29289L94.3427 0.928932C93.9521 0.538408 93.319 0.538408 92.9284 0.928932C92.5379 1.31946 92.5379 1.95262 92.9284 2.34315L98.5853 8L92.9284 13.6569C92.5379 14.0474 92.5379 14.6805 92.9284 15.0711C93.319 15.4616 93.9521 15.4616 94.3427 15.0711L100.707 8.70711ZM99.9995 7L-0.000488281 7V9L99.9995 9V7Z"
                fill="#FEDC78"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MapForm;
