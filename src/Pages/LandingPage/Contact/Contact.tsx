import addressIcon from "@/assets/svg/address.svg";
import phoneIcon from "@/assets/svg/phone.svg";
import calenderIcon from "@/assets/svg/calender-landing.svg";

const Contact = () => {
  const title = "Liên Hệ Ngay";
  const subtitle = "Thông tin liên hệ";
  const address = "53 Lê Vĩnh Hoà, Phường Phú thụ hoà, Quận Tân Phú, TP HCM";
  const phone = "0968127409";
  const open = "Mở cửa: 24/24";

  const data = [
    { icon: addressIcon, value: address },
    { icon: phoneIcon, value: phone },
    { icon: calenderIcon, value: open },
  ];

  return (
    <div className=" dark:bg-transparent flex gap-4 justify-around p-4 transition-all duration-300">
      <div>
        <p className="text-center text-sm font-semibold text-landing lg:hidden">
          {subtitle}
        </p>
        <h3 className="text-center font-playfair lg:text-right lg:text-5xl lg:max-w-[10ch] lg:font-extrabold lg:font-playfair font-bold text-2xl mb-5 tracking-wider text-black md:text-landing">
          {title}
        </h3>

        <div className="space-y-4 lg:mt-12">
          {data.map((x, index) => (
            <div
              key={index}
              className="flex flex-row-reverse items-center lg:items-start hover:opacity-80 justify-end gap-2 lg:flex-row">
              {x.value === phone ? (
                <a
                  className="text-base md:text-xl lg:text-base"
                  href={`tel:${x.value}`}>
                  {x.value}
                </a>
              ) : (
                <span className="hover:opacity-80 lg:max-w-[30ch] text-base md:text-xl lg:text-base lg:text-right leading-5">
                  {x.value}
                </span>
              )}
              <div className="p-2 lg:p-0 rounded-lg border border-landing lg:border-none">
                <img
                  src={x.icon}
                  alt={x.value}
                  loading="lazy"
                  width={20}
                  height={20}
                  className="inline self-start"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
