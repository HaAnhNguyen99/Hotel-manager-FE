export const getTodayISODate = () => {
  const today = new Date().toISOString().split("T")[0];
  return {
    startDate: `${today}T00:00:00.000Z`,
    endDate: `${today}T23:59:59.999Z`,
  };
};
