import Header from "@/components/common/Header/Header";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/UserContext";
import { useHeroImage } from "@/hooks/useHeroImage";
import { WeatherApiResponse } from "@/types/landingpage";
import { MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = ({ weather }: { weather: WeatherApiResponse | undefined }) => {
  const { heroImgPath } = useHeroImage();

  const title = "Khách sạn Phương Trang";
  const des =
    "Chào mừng đến với không gian nghỉ dưỡng ấm cúng và đậm chất việt ";
  const btn = "Đặt phòng ngay";
  const hero = new URL("@/assets/images/hero.png", import.meta.url).href;
  const { isAuthenticated } = useUserContext();

  return (
    <div
      className="min-h-screen bg-cover bg-center relative text-white pt-5 bg-golden-overlay"
      style={{ backgroundImage: `url(${heroImgPath ? heroImgPath : hero})` }}>
      <div className="relative z-50 bg-[#bbbbada1] border border-brown rounded-[3rem] px-5  text-black max-w-screen-xl mx-auto bg-golden-overlay">
        <Header weather={weather} />
      </div>
      <div className="max-w-[811px] absolute top-2/4 left-1/2 -translate-x-1/2 text-center leading-10 space-y-10 z-10">
        <h1 className="text-[3rem] font-bold uppercase tracking-[3px] leading-[1.2] mb-[10px] ">
          {title}
        </h1>
        <p className="golden-paragraph max-w-[45ch] mx-auto leading-10">
          {des}
        </p>
        <Button
          className="rounded-[3rem] bg-brown-yellow px-8 py-7 font-bold text-[18px] border border-[#997f7f] text-brown hover:text-black hover:bg-neutral-300"
          variant="secondary">
          {btn}
        </Button>
      </div>

      {isAuthenticated && (
        <Link to="/dashboard">
          <a className="flex gap-2 px-5 pt-10 text-background items-center relative">
            <MoveLeft className="w-4 h-4" />
            <p>Back to dashboard</p>
          </a>
        </Link>
      )}
    </div>
  );
};

export default Hero;
