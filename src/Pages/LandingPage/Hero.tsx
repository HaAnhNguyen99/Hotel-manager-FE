import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/UserContext";
import { ChevronDown, MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = ({ heroImgPath }: { heroImgPath: string }) => {
  const subTitle = "Khách sạn";
  const title = "Phương Trang";
  const des =
    "Chào mừng đến với không gian nghỉ dưỡng ấm cúng, tiện nghi, thoải mái và đậm chất việt ";
  const btn = "Xem phòng ngay";
  const hero = new URL("@/assets/images/hero.png", import.meta.url).href;
  const { isAuthenticated } = useUserContext();

  return (
    <div
      className="min-h-[90vh] bg-cover bg-center relative text-white pt-5 bg-golden-overlay text-landing-pureWhite"
      style={{ backgroundImage: `url(${heroImgPath ? heroImgPath : hero})` }}>
      <div className="w-3/4 sm:max-w-[811px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center leading-10">
        <p className="text-landing-light font-bold text-xl">{subTitle}</p>
        <h1 className="text-6xl font-extrabold text-shadow text-landing-primaryLight tracking-[3px] leading-[91%] mb-[10px] font-playfair">
          {title}
        </h1>
        <p className="golden-paragraph max-w-[45ch] mt-6 mx-auto text-xl leading-8 md:leading-10">
          {des}
        </p>
        <Button
          className="rounded-lg mt-16 font-bold tracking-wide shadow-[rgba(0,0,0,0.35)_0px_5px_15px] px-3 py-5 md:px-8 md:py-6 md:text-[18px] text-black bg-[#fdf6e3] dark:bg-landing hover:text-brown hover:bg-neutral-300"
          variant="ghost">
          {btn}
        </Button>
      </div>

      <a
        href="#property"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white">
        <ChevronDown className="w-14 h-14 animate-bounce text-landing-textMute" />
      </a>

      {isAuthenticated && (
        <Link to="/dashboard">
          <a className="flex gap-2 px-5 pt-10 text-background items-center relative w-fit">
            <MoveLeft className="w-4 h-4 animate-bounce" />
            <p>Trở về</p>
          </a>
        </Link>
      )}
    </div>
  );
};

export default Hero;
