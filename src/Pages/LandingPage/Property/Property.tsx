import { Bath, BedSingle, Car, PawPrint } from "lucide-react";

const Property = () => {
  const subtitle = "Về chúng tôi";
  const title = "Tiện nghi & dịch vụ thoải mái";
  const des =
    "Chúng tôi mang đến những tiện nghi đầy đủ, thân thiện với khách hàng và tiện lợi - Hy vọng sẽ làm cho của quý khách cảm thấy dễ chịu và thoải mái";
  const data = [
    {
      icon: Car,
      text: "Điểm đỗ xe",
      des: "Chỗ đậu xe hơi thuận tiện, rộng rãi",
    },
    {
      icon: BedSingle,
      text: "Giường ngủ êm ái",
      des: "Giường được chuẩn bị gọn gàng, sạch sẽ",
    },
    {
      icon: PawPrint,
      text: "Động vật được phép",
      des: "Thoải mái mang theo thú cưng",
    },
    {
      icon: Bath,
      text: "Tắm nóng lạnh",
      des: "Nước nóng, nước lạnh, máy lạnh, máy sấy tóc",
    },
  ];
  return (
    <section id="property" className="px-4 py-4 mt-14 sm:mt-0">
      <div className="p-5 text-center">
        <h3 className="font-bold text-lg mb-4 font-sans uppercase tracking-wider text-landing">
          {subtitle}
        </h3>
        <div className="max-w-prose m-auto space-y-6">
          <h3 className="font-bold text-3xl font-playfair">{title}</h3>
          <p className="text-grey-secondaryLight">{des}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-screen-2xl mx-auto items-center gap-8 text-sm md:w-full ">
        {data.map((item, index) => (
          <div
            key={index}
            className=" flex border border-red-100 gap-2 h-full w-full rounded-lg text-center py-6 p-2 bg-[#f9f7f4] flex-col">
            <div className="self-center border border-landing-bgBlack p-1 w-fit h-fit rounded-full mb-5">
              <div className="flex justify-center items-center bg-landing-bgBlack p-3 rounded-full">
                <item.icon className="w-12 h-12 text-landing-primaryLight" />
              </div>
            </div>
            <div>
              <p className="text-xl font-bold font-playfair mb-2 dark:text-black">
                {item.text}
              </p>
              <p className="text-sm dark:text-black px-10">{item.des}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Property;
