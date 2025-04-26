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
    <div className="mt-20">
      <svg
        id="wave"
        style={{ transform: "rotate(0deg)", transition: "0.3s" }}
        viewBox="0 0 1440 110"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
            <stop stop-color="rgba(249, 247, 244, 1)" offset="0%"></stop>
            <stop stop-color="rgba(249, 247, 244, 1)" offset="100%"></stop>
          </linearGradient>
        </defs>
        <path
          style={{ transform: "rotate(0deg)", transition: "0.3s" }}
          fill="url(#sw-gradient-0)"
          d="M0,77L48,64.2C96,51,192,26,288,14.7C384,4,480,7,576,14.7C672,22,768,33,864,38.5C960,44,1056,44,1152,40.3C1248,37,1344,29,1440,27.5C1536,26,1632,29,1728,40.3C1824,51,1920,70,2016,71.5C2112,73,2208,59,2304,58.7C2400,59,2496,73,2592,80.7C2688,88,2784,88,2880,73.3C2976,59,3072,29,3168,18.3C3264,7,3360,15,3456,23.8C3552,33,3648,44,3744,49.5C3840,55,3936,55,4032,51.3C4128,48,4224,40,4320,44C4416,48,4512,62,4608,56.8C4704,51,4800,26,4896,16.5C4992,7,5088,15,5184,29.3C5280,44,5376,66,5472,73.3C5568,81,5664,73,5760,71.5C5856,70,5952,73,6048,73.3C6144,73,6240,70,6336,71.5C6432,73,6528,81,6624,84.3C6720,88,6816,88,6864,88L6912,88L6912,110L6864,110C6816,110,6720,110,6624,110C6528,110,6432,110,6336,110C6240,110,6144,110,6048,110C5952,110,5856,110,5760,110C5664,110,5568,110,5472,110C5376,110,5280,110,5184,110C5088,110,4992,110,4896,110C4800,110,4704,110,4608,110C4512,110,4416,110,4320,110C4224,110,4128,110,4032,110C3936,110,3840,110,3744,110C3648,110,3552,110,3456,110C3360,110,3264,110,3168,110C3072,110,2976,110,2880,110C2784,110,2688,110,2592,110C2496,110,2400,110,2304,110C2208,110,2112,110,2016,110C1920,110,1824,110,1728,110C1632,110,1536,110,1440,110C1344,110,1248,110,1152,110C1056,110,960,110,864,110C768,110,672,110,576,110C480,110,384,110,288,110C192,110,96,110,48,110L0,110Z"></path>
      </svg>
      <section
        id="amenities"
        className="bg-landing-bgLight flex py-12 items-center p-2 px-8 flex-col gap-10 sm:p-4 sm:flex-row lg:px-24">
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
    </div>
  );
};

export default Amenities;
