import Header from "@/components/common/Header/Header";
import Hero from "./Hero";
import Property from "./Property/Property";
import Amenities from "./Amenities/Amenities";
import Rooms from "./Rooms/Rooms";
import Contact from "./Contact/Contact";

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
      </main>
    </div>
  );
};

export default LandingPage;
