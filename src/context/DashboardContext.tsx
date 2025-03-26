// src/context/HotelContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import { Reservation } from "@/types/reservation";

type DashboardData = {
  TotalAmount: number;
  TotalRooms: number;
};

type DashboardContextType = {
  Today: DashboardData;
  PreviousDay: DashboardData;
  PreviousWeek: DashboardData;
  ThisWeek: DashboardData;
  ThisMonth: DashboardData;
  loading: boolean;
  error: string | null;
};

const DashboardContext = createContext<DashboardContextType>(
  {} as DashboardContextType
);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const IniData = {
    TotalAmount: 0,
    TotalRooms: 0,
  };

  const [Today, setToday] = useState<DashboardData>(IniData);
  const [PreviousDay, setPreviousDay] = useState<DashboardData>(IniData);
  const [PreviousWeek, setPreviousWeek] = useState<DashboardData>(IniData);
  const [ThisWeek, setThisWeek] = useState<DashboardData>(IniData);
  const [ThisMonth, setThisMonth] = useState<DashboardData>(IniData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  return (
    <DashboardContext.Provider
      value={{
        Today,
        PreviousDay,
        PreviousWeek,
        ThisWeek,
        ThisMonth,
        loading,
        error,
      }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
