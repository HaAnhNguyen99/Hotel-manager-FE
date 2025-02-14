export const addBookingToRoom = (rooms, data) => {
  const newBooking = data;

  if (!rooms.bookings) {
    rooms.bookings = [];
  }

  rooms.bookings.push(newBooking);
  return rooms;
};
