const className =
  "w-full border-b outline-none bg-transparent border-landing-bgBlack focus:outline-none";

export const InputForm = ({
  label,
  placeholder,
  type = "string",
}: {
  label: string;
  placeholder?: string;
  type?: string;
}) => {
  return (
    <div className="mb-2">
      <label htmlFor="name" className="text-brown-yellow mb-2 block">
        {label}
      </label>
      <input
        className={className}
        type={type}
        id="name"
        placeholder={placeholder}
      />
    </div>
  );
};

export const TextAreaForm = () => {
  return (
    <>
      <label
        htmlFor="message"
        className="text-brown-yello mb-2 block text-brown-yellow">
        Lời nhắn
      </label>
      <textarea className={`${className} resize-none`} id="message" rows={4} />
    </>
  );
};

const MapForm = () => {
  return (
    <div className="w-full hidden lg:block absolute left-1/4 z-10 shadow-md top-10 right-0 lg:w-4/5 -translate-x-20 bg-landing-primaryLight py-16 -translate-y-8 pl-[27%] pr-10">
      <form className="lg:flex lg:flex-col lg:items-start lg:justify-start lg:p-0  text-landing lg:*:w-full lg:w-full lg:h-full lg:pl-10 ">
        <InputForm label="Họ tên" />
        <InputForm label="Email" type="email" />
        <TextAreaForm />
        <div className="px-8 mt-3">
          <button className="w-full p-2 bg-white text-brown-yellow mt-4 flex justify-between items-center px-8 text-lg">
            <span>Gửi</span>
            <svg
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
