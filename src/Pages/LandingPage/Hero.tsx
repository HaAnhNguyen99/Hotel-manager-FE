import { useUserContext } from "@/context/UserContext";
import { MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const title = "Lorem ipsum dolor sit amet.";
  const des =
    "orem ipsum dolor sit amet, consectetur adipiscing elit. Proin ex dolor,";

  const { isAuthenticated } = useUserContext();

  return (
    <div className="min-h-svh bg-gray-300 relative">
      <div className="max-w-4xl absolute bottom-36 left-12 leading-10">
        <h1 className="font-bold text-3xl">{title}</h1>
        <p>{des}</p>
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
