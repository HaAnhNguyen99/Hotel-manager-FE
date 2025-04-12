import logo from "@/assets/images/logo v2 dark.jpeg";
import { Button } from "@/components/ui/button";
import Login from "./Login";
import { useUserContext } from "@/context/UserContext";
import { WeatherApiResponse } from "@/types/landingpage";
const Header = ({ weather }: { weather: WeatherApiResponse | undefined }) => {
  const data = [
    { title: "Chính sách", link: "#" },
    { title: "Dịch vụ", link: "#" },
    { title: "Tiện nghi", link: "#" },
    { title: "Không gian", link: "#" },
  ];

  const { isAuthenticated, logoutUser } = useUserContext();
  return (
    <header className="flex justify-between items-center p-4 text-brown">
      <div className="flex gap-2 items-center">
        <div className="w-10 aspect-square rounded-lg overflow-hidden">
          <img
            src={logo}
            alt="logo phuong trang"
            className="object-contain w-full h-full"
          />
        </div>
        <h3 className="text-xl font-normal leading-4">
          Phương trang <br />{" "}
          <span className="leading-[0.8px] font-extralight text-sm">Hotel</span>
        </h3>
      </div>
      <div className="flex gap-8">
        {data.map((x, index) => (
          <div key={index}>
            {
              <a
                href={x.link}
                className="font-bold  hover:text-lg transition-all duration-300 ease-in-out">
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
                  className="w-12 h-12"
                />
                <p className="text-sm font-bold">{weather.main.temp}°C</p>
              </>
            )}
          </div>
        </div>
        {isAuthenticated ? (
          <Button variant="outline" className="bg-white" onClick={logoutUser}>
            Đăng xuất
          </Button>
        ) : (
          <Login />
        )}
      </div>
    </header>
  );
};

export default Header;
