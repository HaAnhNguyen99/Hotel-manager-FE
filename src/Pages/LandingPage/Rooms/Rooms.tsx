import RoomItems from "./RoomItems";

const Rooms = () => {
  const title = "Property Rental Guides & Tips";
  return (
    <section className="p-4 px-8">
      <h3 className="w-fit text-3xl font-extrabold relative after:content-[''] after:absolute after:left-0 after:-bottom-10 after:w-1/3 after:h-1 after:bg-black after:rounded-md">
        {title}
      </h3>

      <RoomItems />
    </section>
  );
};

export default Rooms;
