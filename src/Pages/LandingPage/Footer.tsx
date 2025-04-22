import { Facebook, Youtube } from "lucide-react";

const Footer = () => {
  const data = [
    { title: "Chính sách", link: "#property" },
    { title: "Tiện nghi", link: "#amenities" },
    { title: "Không gian", link: "#rooms" },
    { title: "Liên hệ", link: "#contact" },
  ];
  const icons = [
    { icon: Facebook, link: "https://www.facebook.com/" },
    { icon: Youtube, link: "https://www.youtube.com/" },
  ];
  return (
    <footer className="space-y-5 h-[20vh] bg-landing-primaryLight p-10 text-landing-textMute">
      <div className="flex gap-2 justify-center md:gap-8 text-center">
        {data.map((x, index) => (
          <div key={index}>
            {
              <a
                href={x.link}
                className="font-bold w-fit leading-tight text-sm transition-all duration-300 ease-in-out md:text-balance after-content after:bg-landing after:scale-x-0 hover:after:scale-x-100 after:transition-all after:duration-300 after:ease-in-out">
                {x.title}
              </a>
            }
          </div>
        ))}
      </div>
      <div className=" flex justify-center gap-5">
        {icons.map((x, index) => (
          <a href={x.link} key={index} className="hover:opacity-80">
            <x.icon key={index} className="w-6 h-6" />
          </a>
        ))}
      </div>
      <div className="text-center text-sm">
        Phuong Trang hotel @ 202X. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
