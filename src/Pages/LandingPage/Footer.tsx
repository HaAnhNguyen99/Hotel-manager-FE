import { Facebook, Youtube } from "lucide-react";

const Footer = () => {
  const data = [
    { title: "Chính sách", link: "#property" },
    { title: "Tiện nghi", link: "#amenities" },
    { title: "Không gian", link: "#rooms" },
    { title: "Liên hệ", link: "#contact" },
  ];
  const icons = [{ icon: Facebook }, { icon: Youtube }];
  return (
    <footer className="text-white space-y-5 h-[20vh] bg-gray-400 p-10">
      <div className="flex gap-2 justify-center md:gap-8 text-center">
        {data.map((x, index) => (
          <div key={index}>
            {
              <a
                href={x.link}
                className="font-bold w-fit leading-tight text-sm  hover:text-lg transition-all duration-300 ease-in-out md:text-balance">
                {x.title}
              </a>
            }
          </div>
        ))}
      </div>
      <div className=" flex justify-center gap-5">
        {icons.map((x, index) => (
          <x.icon key={index} color="white" className="w-6 h-6 text-blue-500" />
        ))}
      </div>
      <div className="text-center text-sm">
        Phuong Trang hotel @ 202X. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
