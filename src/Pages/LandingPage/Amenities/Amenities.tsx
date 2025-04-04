import { Amenities as AmenitiesData } from "./AmenitiesItems.data";
import { Safety } from "./AmenitiesItems.data";
const Amenities = () => {
  const AmenitiesTitle = "Tiện nghi";
  const SafetyTitle = "An toàn và Vệ sinh";
  return (
    <section className="flex mt-20 items-center p-4 pl-8">
      <div className="w-1/2">
        {/* Amenities */}
        <div>
          <h3 className="font-bold text-2xl my-8">{AmenitiesTitle}</h3>
          <div className="flex justify-between flex-wrap gap-y-5">
            {AmenitiesData.map((x, index) => (
              <div key={index} className="flex gap-2 w-1/2">
                <x.icon className="w-6 h-6 text-blue-500" />
                <div>{x.title}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Safety */}
        <div>
          <h3 className="my-8 font-bold text-2xl mt-10">{SafetyTitle}</h3>
          <div className="flex justify-between flex-wrap gap-y-5">
            {Safety.map((x, index) => (
              <div key={index} className="flex gap-2  w-1/2">
                <x.icon className="w-6 h-6 text-blue-500" />
                <div>{x.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-1/2 flex items-center">
        <div className="h-[43vh] w-4/12 rounded-2xl bg-slate-200 relative translate-x-7 z-0"></div>
        <div className="h-[50vh] w-2/3 rounded-2xl bg-slate-500 relative z-10 p-4">
          <div className="w-full h-full rounded-xl bg-slate-200 relative z-10"></div>
        </div>
        <div className="h-[43vh] w-4/12 rounded-2xl bg-slate-800 relative -translate-x-7 z-0"></div>
      </div>
    </section>
  );
};

export default Amenities;
