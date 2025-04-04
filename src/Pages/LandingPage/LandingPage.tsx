import Header from "@/components/common/Header/Header";
import Hero from "./Hero";
import Property from "./Property/Property";
import Amenities from "./Amenities/Amenities";
import Rooms from "./Rooms/Rooms";
import Contact from "./Contact/Contact";
import Map from "./Map/Map";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <div>
      <Header />
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
