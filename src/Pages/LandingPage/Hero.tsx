import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/UserContext";
import { useHeroImage } from "@/hooks/useHeroImage";
import { ChevronDown, MoveLeft } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useIsMobile } from "@/hooks/use-mobile";
import SplitText from "gsap/SplitText";

const Hero = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const desRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const subTitleRef = useRef<HTMLParagraphElement>(null);
  const arrowRef = useRef<HTMLAnchorElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  const { loading, heroImgPath } = useHeroImage();
  const { isAuthenticated } = useUserContext();
  const isMobile = useIsMobile();
  const delayAnimationTime = 5;

  gsap.registerPlugin(SplitText);

  const fontSize = isMobile ? "17vw" : "10.5vw";
  const Width = isMobile ? "50px" : "300px";
  const Height = isMobile ? "200px" : "520px";

  useGSAP(
    () => {
      if (!textRef.current) return;
      const split = new SplitText(textRef.current, { type: "words, chars" });

      gsap.fromTo(
        split.chars,
        {
          y: -100,
          autoAlpha: 0,
          stagger: 0.1,
        },
        {
          y: 0,
          duration: 2,
          autoAlpha: 1,
          stagger: 0.1,
        }
      );

      if (!loading) {
        gsap
          .fromTo(
            textRef.current,
            {
              color: "#222",
              className: `text-center -translate-x-1/4 font-extrabold text-shadow text-landing-primaryLight tracking-[3px] leading-[91%] mb-[10px] font-playfair`,
              transform: "translate(0%, 1rem)",
              fontSize,
            },
            {
              className:
                "text-center -translate-x-1/4 font-extrabold text-shadow text-landing-primaryLight tracking-[3px] leading-[91%] mb-[10px] font-playfair",
              duration: 1,
              ease: "power2.inOut",
              position: "static",
              transform: "translate(0%, 0%)",
              fontSize: "3.75rem",
              color: "#f0e6d2",
            }
          )
          .delay(delayAnimationTime);
        gsap
          .fromTo(
            desRef.current,
            { x: "2rem", opacity: 0 },
            {
              x: "0",
              opacity: 1,
              ease: "power3.out",
            }
          )
          .delay(delayAnimationTime + 1.4);

        gsap
          .fromTo(
            subTitleRef.current,
            { x: "-2rem", opacity: 0 },
            {
              x: "0",
              opacity: 1,
              ease: "power3.out",
            }
          )
          .delay(delayAnimationTime + 1);

        gsap
          .fromTo(
            btnRef.current,
            { x: "-2rem", opacity: 0 },
            {
              x: "0",
              opacity: 1,
              ease: "power3.out",
            }
          )
          .delay(delayAnimationTime + 1.6);

        gsap
          .fromTo(
            arrowRef.current,
            { x: "-2rem", opacity: 0 },
            {
              x: "0",
              opacity: 1,
              ease: "power3.out",
            }
          )
          .delay(delayAnimationTime + 1.6);

        gsap
          .fromTo(
            bgRef.current,
            {
              clearProps: "transform",
              left: "100%",
              delay: 1,
              width: Width,
              height: Height,
              overflow: "hidden",
            },
            {
              delay: 0.2,
              duration: 0.7,
              scale: 1,
              width: Width,
              height: Height,
              opacity: 1,
              overflow: "hidden",
              ease: "power2.inOut",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              onComplete: () => {
                gsap.to(bgRef.current, {
                  ease: "power3.inOut",
                  top: "0%",
                  left: "0%",
                  right: "0%",
                  bottom: "0%",
                  delay: 0.1,
                  duration: 0.5,
                  transform: `translate(0%, 0%)`,
                  width: "100%",
                  height: "100%",
                });
              },
            }
          )
          .delay(delayAnimationTime);
      }
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={`min-h-[90vh] relative pt-5 transition-all duration-300 text-landing-pureWhite overflow-hidden`}>
      <img
        src={heroImgPath}
        alt="Hero background"
        onLoad={() => setIsImageLoaded(true)}
        ref={bgRef}
        className={`absolute object-cover object-center ${
          isImageLoaded ? "bg-golden-overlay" : "bg-[#e5e7eb]"
        }`}
      />

      <div className="absolute top-1/2 left-1/2 w-3/4 max-w-[811px] -translate-x-1/2 -translate-y-1/2 text-center leading-10">
        <div className="relative">
          <p ref={subTitleRef} className="text-landing-light font-bold">
            Khách sạn
          </p>
          <h1 ref={textRef}>Phương Trang</h1>
        </div>
        <p
          ref={desRef}
          className="golden-paragraph max-w-[45ch] mt-6 mx-auto text-xl leading-8 md:leading-10">
          Chào mừng đến với không gian nghỉ dưỡng ấm cúng, tiện nghi, thoải mái
          và đậm chất việt
        </p>
        <Button
          ref={btnRef}
          variant="ghost"
          className="mt-16 rounded-lg bg-[#fdf6e3] px-3 py-5 font-bold shadow-[rgba(0,0,0,0.35)_0px_5px_15px] text-black tracking-wide dark:bg-landing hover:bg-neutral-300 hover:text-brown md:px-8 md:py-6 md:text-[18px]">
          <a href="#rooms">Xem phòng ngay</a>
        </Button>
      </div>

      <a
        ref={arrowRef}
        href="#property"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white"
        aria-label="Scroll to properties">
        <ChevronDown className="animate-bounce w-14 h-14 text-landing-textMute" />
      </a>

      {isAuthenticated && (
        <Link
          to="/dashboard"
          className="absolute top-10 left-5 flex w-fit items-center gap-2 px-5 text-background">
          <MoveLeft className="animate-bounce w-4 h-4" />
          <span>Trở về</span>
        </Link>
      )}
    </div>
  );
};

export default Hero;
