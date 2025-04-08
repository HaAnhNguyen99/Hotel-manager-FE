export const getTodayISODate = (date?: Date | undefined) => {
  if (date) {
    console.log(date);
    const formattedDate = date.toISOString().split('T')[0];
    return {
      startDate: `${formattedDate}T00:00:00.000Z`,
      endDate: `${formattedDate}T23:59:59.999Z`,
    };
  }
  const today = new Date().toISOString().split('T')[0];
  return {
    startDate: `${today}T00:00:00.000Z`,
    endDate: `${today}T23:59:59.999Z`,
  };
};
