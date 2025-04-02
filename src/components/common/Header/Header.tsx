import logo from "@/assets/images/logo v2 dark.jpeg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const Header = () => {
  const data = [
    { title: "Lorem", link: "#" },
    { title: "Lorem", link: "#" },
    { title: "Lorem", link: "#" },
    { title: "Lorem", link: "#" },
  ];
  return (
    <header className="flex justify-between items-center p-4">
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
          <div key={index}>{<Link to={x.link}>{x.title}</Link>}</div>
        ))}
      </div>
      <Button className="px-4 py-2 border border-border text-border">
        Đăng nhập
      </Button>
    </header>
  );
};

export default Header;
