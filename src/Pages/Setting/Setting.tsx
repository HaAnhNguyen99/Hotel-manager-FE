import ServiceFormDialog from "./ServiceFormDialog";
import { useEffect, useState } from "react";
import ToolBar from "./ToolBar";
import ServicesTable from "./ServicesTable";
import { ServiceData } from "@/types/service";
import { getServices } from "@/services/hotelService";
import { useServiceContext } from "@/context/ServiceContext";
import { Loading } from "@/components/common/Loading/Loading";
import LoadingText from "@/components/common/LoadingText/LoadingText";
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
      <header className="flex mb-10 justify-between">
        <h3 className="text-3xl font-bold font-playfair">Quản lý dịch vụ</h3>
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
