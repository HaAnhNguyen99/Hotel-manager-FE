import { useRoomImage } from "@/hooks/useRoomImage";
import BedIcon from "@/assets/svg/bed.svg";
import GroupIcon from "@/assets/svg/group.svg";
import AirConditionerIcon from "@/assets/svg/airconditioner.svg";

const RoomItems = () => {
  const { roomImagePath } = useRoomImage();

  const img2 = roomImagePath?.[0]?.url || "";
  const img1 = roomImagePath?.[1]?.url || "";
  const img3 = roomImagePath?.[2]?.url || "";

  const data = [
    { src: img1, roomType: "Phòng giờ", price: "50.000đ", per: "/ 1 giờ" },
    { src: img2, roomType: "Qua đêm", price: "200.000đ", per: "/ 1 đêm" },
    { src: img3, roomType: "Phòng ngày", price: "250.000đ", per: "/ 1 ngày" },
  ];

  const amenties = [
    { icon: BedIcon, title: "Giường đôi" },
    { icon: GroupIcon, title: "2 người" },
    { icon: AirConditionerIcon, title: "Điều hoà" },
  ];
  return (
    <div className="grid grid-cols-1 dark:text-black md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-5 md:justify-between dark:bg-transparent mt-20 lg:max-w-[80%] lg:mx-auto lg:gap-10">
      {data.map((item, index) => (
        <div
          key={index}
          className="h-fit will-change hover:scale-105 transition-transform duration-300 ease-in-out shadow-medium w-full rounded-2xl overflow-hidden">
          <div className="h-[50vh] sm:h-[30vh] md:h-[40vh] lg:h-[50vh] w-full flex flex-col bg-landing-pureWhite  rounded-2xl overflow-hidden pb-6">
            <div className="h-4/5 mb-2 flex-1 relative">
              <img
                src={item.src}
                alt={item.roomType}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(0deg, rgba(240, 230, 210, 0.2) 0%, rgba(240, 230, 210, 0.2) 100%)`,
                }}
              />
            </div>
            <div className="px-5 md:px-5 tracking-wider">
              <div className="font-playfair border-b border-landing mb-2 pb-2">
                <h3 className="font-bold md:text-xl">{item.roomType}</h3>
                <p className="mt-2">
                  <span className="text-landing md:text-lg md:font-semibold">
                    {item.price}
                  </span>
                  <span>{item.per}</span>
                </p>
              </div>
              <div className="flex justify-between text-extrasm ">
                {amenties.map((x, index) => (
                  <div key={index} className="flex gap-1 md:gap-2">
                    <img
                      src={x.icon}
                      alt={x.title}
                      loading="lazy"
                      width={20}
                      height={20}
                    />
                    <div>{x.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomItems;
