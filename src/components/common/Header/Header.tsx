import logo from "@/assets/images/logo v2 dark.jpeg";
import { Button } from "@/components/ui/button";
import Login from "./Login";
import { useUserContext } from "@/context/UserContext";
import { WeatherApiResponse } from "@/types/landingpage";
import { LogOut } from "lucide-react";
const Header = ({ weather }: { weather: WeatherApiResponse | undefined }) => {
  const data = [
    { title: "Chính sách", link: "#property" },
    { title: "Tiện nghi", link: "#amenities" },
    { title: "Không gian", link: "#rooms" },
    { title: "Liên hệ", link: "#contact" },
  ];

  const { isAuthenticated, logoutUser } = useUserContext();
  return (
    <header className="flex gap-2 justify-between items-center p-3 text-brown bg-[#f5f5f5] md:p-4">
      <div className="flex gap-2 items-center">
        <div className="w-10 aspect-square rounded-lg overflow-hidden ">
          <img
            src={logo}
            alt="logo phuong trang"
            loading="lazy"
            className="object-contain w-full h-full"
          />
        </div>
        <h3 className="text-xl font-normal leading-4 hidden md:block">
          Phương trang <br />{" "}
          <span className="leading-[0.8px] font-extralight text-sm">Hotel</span>
        </h3>
      </div>
      <div className="flex gap-2 justify-between md:gap-8 text-center">
        {data.map((x, index) => (
          <div key={index}>
            {
              <a
                href={x.link}
                className="font-bold w-fit leading-tight text-sm after-content after:bg-landing after:scale-x-0 hover:after:scale-x-100 after:transition-all after:duration-300 after:ease-in-out transition-all duration-300 ease-in-out md:text-balance">
                {x.title}
              </a>
            }
          </div>
        ))}
      </div>
      <div className="flex gap-2 items-center">
        <div className="md:block hidden">
          <div className="flex gap-2 items-center">
            {weather && (
              <>
                <img
                  src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
                  alt="Weather icon"
                  className="w-12 h-12 filter invert sepia saturate-500 hue-rotate-[-50deg]"
                />
                <p className="text-sm font-bold">{weather.main.temp}°C</p>
              </>
            )}
          </div>
        </div>
        {isAuthenticated ? (
          <Button variant="outline" className="bg-white" onClick={logoutUser}>
            <span className="hidden sm:block">Đăng xuất</span>
            <LogOut className="sm:hidden w-4 h-4" />
          </Button>
        ) : (
          <Login />
        )}
      </div>
    </header>
  );
};

export default Header;
