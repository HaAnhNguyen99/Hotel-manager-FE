import { useProperty } from "@/hooks/useProperty";
import { Amenities as AmenitiesData } from "./AmenitiesItems.data";
import { Safety } from "./AmenitiesItems.data";
const Amenities = () => {
  const { propertyImgPath } = useProperty();

  const img2 = propertyImgPath?.[0]?.url || "";
  const img1 = propertyImgPath?.[1]?.url || "";
  const img3 = propertyImgPath?.[2]?.url || "";
  const AmenitiesTitle = "Tiện nghi";
  const AmenitiesDesc =
    "Những tiện ích được chuẩn bị sẵn để quý khách cảm thấy thoải mái như ở nhà.";
  const SafetyTitle = "An toàn và Vệ sinh";
  return (
    <section
      id="amenities"
      className="bg-landing-bgLight flex mt-20 md:mt-32 py-12 md:pt-6 items-center p-2 px-8 flex-col gap-10 sm:p-4 sm:flex-row lg:px-24 lg:mt-32 lg:pt-20">
      <div className="w-full sm:w-1/2">
        {/* Amenities */}
        <div className="md:w-[80%] lg:w-[80%] mx-auto">
          <h3 className="font-bold font-playfair text-2xl text-center mb-4 md:mb-2 dark:text-black">
            {AmenitiesTitle}
          </h3>
          <h3 className="mb-12 md:mb-8 text-sm text-center max-w-[45ch] w-full leading-tight dark:text-gray-700 m-auto md:w-full lg:w-full">
            {AmenitiesDesc}
          </h3>
          <div className="grid grid-cols-3 gap-5 gap-y-5 text-landing">
            {AmenitiesData.map((x, index) => (
              <div key={index} className="flex gap-2">
                <x.icon className="w-6 h-6 " />
                <div>{x.title}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Safety */}
        <div className="md:w-[80%] lg:w-[80%] mx-auto">
          <h3 className="font-bold font-playfair text-2xl text-center my-10 dark:text-black">
            {SafetyTitle}
          </h3>
          <div className="grid grid-cols-2 gap-5 text-landing">
            {Safety.map((x, index) => (
              <div key={index} className="flex gap-2">
                <x.icon className="w-6 h-6 flex-shrink-0" />
                <div>{x.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full sm:w-1/2 flex items-center mx-auto ">
        <div
          className="h-[33vh] w-[20%] rounded-l-2xl relative translate-x-2 sm:translate-x-2 z-0 lg:h-[43vh]"
          style={{
            backgroundImage: `url(${img1})`,
            backgroundSize: "cover",
            backgroundPosition: "top right",
            backgroundRepeat: "no-repeat",
          }}></div>
        <div className="h-[40vh] w-[60%] lg:h-[53vh] lg:w-[50%] lg:aspect-[4/3] rounded-2xl bg-landing-bgLight relative z-10 p-4  border border-landing-bgBlack">
          <div
            className="w-full h-full rounded-xl bg-slate-200 relative z-10"
            style={{
              backgroundImage: `url(${img2})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}></div>
        </div>
        <div
          className="h-[33vh] w-[20%] rounded-r-2xl relative -translate-x-2 sm:-translate-x-2 z-0 lg:h-[43vh]"
          style={{
            backgroundImage: `url(${img3})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}></div>
      </div>
    </section>
  );
};

export default Amenities;
