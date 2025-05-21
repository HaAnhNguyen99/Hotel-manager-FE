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
import { useHeroImage } from "@/hooks/useHeroImage";
import LoadingText from "@/components/common/LoadingText/LoadingText";
import ErrorPage from "@/components/common/ErrorPage";

const LandingPage = () => {
  const { weather } = useWeather();
  const { heroImgPath, loading, error } = useHeroImage();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingText />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-bold">
        <ErrorPage />
      </div>
    );
  }

  return (
    <div className="font-pops fade-in">
      <Header weather={weather} />
      <main>
        <Hero heroImgPath={heroImgPath} />
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
