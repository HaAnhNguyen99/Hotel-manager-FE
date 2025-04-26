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
        <section
          id="contact"
          className="flex flex-col lg:flex-row mt-10 pb-10 px-2 md:px5 lg:justify-center gap-10 lg:gap-2 lg:items-center lg:pb-14">
          <Contact />
          <Map />
        </section>
        <Footer />
      </main>
    </div>
  );
};

export default LandingPage;
