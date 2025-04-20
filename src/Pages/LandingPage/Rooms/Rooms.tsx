import RoomItems from "./RoomItems";

const Rooms = () => {
  const title = "Thân thiện & Ấm cúng";
  const subTitle = "Không gian";
  return (
    <section
      id="rooms"
      className="p-4 px-8 bg-landing-bgLight lg:px-40 lg:py-14 pt-16 md:pt-20 md:px-3">
      <div className="space-y-4 text-center">
        <p className="tracking-wider font-semibold text-landing md:text-xl ">
          {subTitle}
        </p>
        <h3 className="w-fit mx-auto font-playfair text-3xl font-extrabold relative after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-5 after:w-1/3 after:h-1 after:bg-black after:rounded-md md:text-4xl">
          {title}
        </h3>
      </div>

      <RoomItems />
    </section>
  );
};

export default Rooms;
