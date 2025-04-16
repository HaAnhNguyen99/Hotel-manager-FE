import Hero from "./Hero";
import Property from "./Property/Property";
import Amenities from "./Amenities/Amenities";
import Rooms from "./Rooms/Rooms";
import Contact from "./Contact/Contact";
import Map from "./Map/Map";
import Footer from "./Footer";
import useWeather from "@/hooks/useWeather";
import Header from "@/components/common/Header/Header";
import "./LandingPage.css";

const LandingPage = () => {
  const { weather } = useWeather();

  return (
    <div className="font-pops">
      <Header weather={weather} />
      <main>
        <Hero />
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
