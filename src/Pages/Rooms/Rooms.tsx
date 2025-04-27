import ErrorPage from "@/components/common/ErrorPage";
import { Loading } from "@/components/common/Loading/Loading";
import { useRoomsContext } from "@/context/RoomContext";
import RoomsTable from "./RoomsTable";

const Rooms = () => {
  const { loading, error } = useRoomsContext();
  if (loading)
    return (
      <>
        <Loading />
      </>
    );

  if (error) return <ErrorPage error={error.message} />;

  return (
    <section className="max-w-[90%] mx-auto font-pops select-none">
      {/* Header */}
      <header className="flex mb-10 justify-between bg-yellow text-black p-10 rounded-2xl">
        <h3 className="text-3xl font-bold font-playfair after-content after:bg-primary after:w-[50%] after:-bottom-2">
          Quản lý phòng
        </h3>
      </header>

      {/* Table service */}
      <RoomsTable />
    </section>
  );
};

export default Rooms;
