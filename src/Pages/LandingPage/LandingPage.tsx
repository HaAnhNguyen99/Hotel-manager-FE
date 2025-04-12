import Hero from "./Hero";
import Property from "./Property/Property";
import Amenities from "./Amenities/Amenities";
import Rooms from "./Rooms/Rooms";
import Contact from "./Contact/Contact";
import Map from "./Map/Map";
import Footer from "./Footer";
import useWeather from "@/hooks/useWeather";
import { useProperty } from "@/hooks/useProperty";

const LandingPage = () => {
  const { weather } = useWeather();

  return (
    <div>
      <main>
        <Hero weather={weather} />
        <Property />
        <Amenities />
        <Rooms />
        <Contact />
        <Map />
        <Footer />
      </main>
    </div>
  );
};

export default LandingPage;
