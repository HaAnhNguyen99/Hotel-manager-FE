export const calculateTotalRooms = (rooms): number => {
  const total = rooms.reduce((total: number) => {
    return (total += 1);
  }, 0);
  return total;
};
