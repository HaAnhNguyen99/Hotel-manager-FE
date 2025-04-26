import ServiceFormDialog from "./ServiceFormDialog";
import ToolBar from "./ToolBar";
import ServicesTable from "./ServicesTable";
import { useServiceContext } from "@/context/ServiceContext";
import { Loading } from "@/components/common/Loading/Loading";
import ErrorPage from "@/components/common/ErrorPage";

const Setting = () => {
  const { services, loading, error } = useServiceContext();

  if (loading)
    return (
      <>
        <Loading />
      </>
    );

  if (error) return <ErrorPage error={error.message} />;

  return (
    <section className="max-w-[90%] mx-auto font-pops">
      {/* Header */}
      <header className="flex mb-10 justify-between bg-yellow text-black p-10 rounded-2xl">
        <h3 className="text-3xl font-bold font-playfair after-content after:bg-primary after:w-[50%] after:-bottom-2">
          Quản lý dịch vụ
        </h3>
        <ServiceFormDialog />
      </header>

      {/* Toolbar */}
      <ToolBar />

      {/* Table service */}
      <ServicesTable ServiceData={services} />
    </section>
  );
};

export default Setting;
