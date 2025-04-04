import { Facebook, Youtube } from "lucide-react";

const Footer = () => {
  const data = ["one", "two", "three", "four", "five", "six"];
  const icons = [{ icon: Facebook }, { icon: Youtube }];
  return (
    <footer className="text-white space-y-5 h-[20vh] bg-gray-400 p-10">
      <div className="flex gap-2 justify-center">
        {data.map((x, index) => (
          <p key={index}>{x}</p>
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
