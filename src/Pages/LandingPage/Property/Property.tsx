import { useProperty } from "@/hooks/useProperty";
import { Bath, BedSingle, Car, PawPrint } from "lucide-react";

const Property = () => {
  const { propertyImgPath } = useProperty();

  const title = "Chính sách khách sạn";
  const des =
    "Một vài quy định nhỏ để đảm bảo anh/chị có kỳ nghỉ thật thoải mái và trọn vẹn.";
  const data = [
    {
      icon: Car,
      text: "Điểm đỗ xe",
    },
    {
      icon: BedSingle,
      text: "Giường đôi",
    },
    {
      icon: PawPrint,
      text: "Động vật được phép",
    },
    {
      icon: Bath,
      text: "Nước nóng",
    },
  ];
  return (
    <section id="property" className="px-4 py-4 mt-14 sm:mt-0">
      <div className="p-5">
        <h3 className="font-bold text-2xl">{title}</h3>
        <p className="text-grey-secondaryLight">{des}</p>
      </div>
      <div className="flex justify-between flex-col-reverse items-center gap-7 md:items-start lg:flex-row lg:gap-32">
        <div className="flex flex-wrap justify-around font-bold items-center gap-8 text-sm md:w-full lg:gap-x-4 lg:gap-y-10 lg:w-1/2 lg:flex-row lg:text-base m-auto">
          {data.map((item, index) => (
            <div
              key={index}
              className=" flex rounded-lg aspect-square w-[calc(50%-2rem)] text-center h-fit p-2 text-brown bg-golden-overlay border-black border flex-col justify-center items-center md:w-[calc(20%-0.5rem)] lg:w-[calc(50%-5rem)]">
              <item.icon className="w-12 h-12 mb-2 text-brown" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
        <div className="rounded-2xl bg-black md:w-full md:h-[50vh] overflow-hidden w-full">
          <img
            src={propertyImgPath}
            alt="property img"
            loading="lazy"
            className="object-fill w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Property;
