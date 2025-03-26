import { CreateServiceUsagePayload } from "@/types/service";
import axios from "axios";
import {
  BookingStatus,
  CreateBookingPayload,
  UpdateBookingData,
} from "@/types/booking";
import { UpdateServiceUsagePayload } from "@/types/service_usage";
import { FetchRoom, RoomBooking, RoomStatus } from "@/types/room";
import { CreatePaymentPayload } from "@/types/payment";
import { compareDaily, dailyStat, yearlyStat } from "@/types/reservation";

// Create a single Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Fetches a list of rooms from the API.
 *
 * @returns A promise that resolves to an array of Room objects.
 */
export const fetchRooms = async (): Promise<FetchRoom> => {
  try {
    const response = await api.get("/rooms?sort[0]=room_number&populate=*");
    return response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw new Error("Failed to fetch rooms");
  }
};

/**
 * Fetches a list of bookings for a given room from the API.
 *
 * @param roomId The ID of the room.
 * @returns A promise that resolves to an array of Booking objects.
 */
export const getRoomBooking = async (roomId: string): Promise<RoomBooking> => {
  try {
    const response = await api.get(
      `/bookings?filters[room][documentId][$eq]=${roomId}&[booking_status][$eq]=Pending`
    );
    const data = response.data.data.filter((item: RoomBooking) => {
      return item.booking_status === BookingStatus.Pending;
    });
    return data[0];
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw new Error("Failed to fetch bookings");
  }
};

/**
 * Creates a new service usage record.
 *
 * @param payload The payload for the new service usage.
 * @returns A promise that resolves to the created service usage data.
 */
export const createServiceUsage = async (
  payload: CreateServiceUsagePayload
) => {
  try {
    const response = await api.post("/service-usages", payload);
    return response.data;
  } catch (error) {
    console.error("Error creating service usage:", error);
    throw error;
  }
};

/**
 * Creates a new booking.
 *
 * @param payload The payload for the new booking.
 * @returns A promise that resolves to the created booking data.
 */
export interface CreateBookingType {
  data: CreateBookingPayload;
}
export const createBooking = async (payload: CreateBookingType) => {
  try {
    const response = await api.post("/bookings", payload);
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

/**
 * Cancels a booking.
 *
 * @param bookingId The ID of the booking to cancel.
 * @returns A promise that resolves to the cancelled booking data.
 */
export const cancelBooking = async (bookingId: string) => {
  try {
    const response = await api.delete(`/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error("Error canceling booking:", error);
    throw error;
  }
};

/**
 * Fetches service usage records for a given booking.
 *
 * @param bookingId The ID of the booking.
 * @returns A promise that resolves to an array of service usage records.
 */
export const getServiceUsage = async (bookingId: string) => {
  try {
    const response = await api.get(
      `/service-usages?filters[booking][documentId][$eq]=${bookingId}&populate=*`
    );
    return response.data.data;
  } catch (err) {
    console.error("Error fetching service usage:", err);
    throw err;
  }
};

/**
 * Fetches service usage records for a given booking that are paid.
 *
 * @param bookingId The ID of the booking.
 * @returns A promise that resolves to an array of service usage records.
 */
export const getServiceUsageStatusPayed = async (bookingId: string) => {
  try {
    const response = await api.get(
      `/service-usages?filters[booking][documentId][$eq]=${bookingId}&filters[service_status][$eq]=Chưa thanh toán&populate=service`
    );
    return response.data.data;
  } catch (err) {
    console.error("Error fetching service usage:", err);
    throw err;
  }
};

/**
 * Updates a service usage record.
 *
 * @param serviceUsageId The ID of the service usage to update.
 * @param payload The payload for the update.
 * @returns A promise that resolves to the updated service usage data.
 */
export const updateServiceUsage = async (
  serviceUsageId: string,
  payload: UpdateServiceUsagePayload
) => {
  try {
    const response = await api.put(
      `/service-usages/${serviceUsageId}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error updating service usage:", error);
    throw error;
  }
};

/**
 * Updates the status of a service usage record.
 *
 * @param serviceUsageId The ID of the service usage to update.
 * @param service_status The new status of the service usage.
 * @returns A promise that resolves to the updated service usage data.
 */
export const updateServicePayment = async (
  serviceUsageId: string,
  service_status: string
) => {
  try {
    await api.put(`/service-usages/${serviceUsageId}`, {
      data: {
        service_status,
      },
    });
    return;
  } catch (error) {
    console.error("Error updating service usage:", error);
    throw error;
  }
};

/**
 * Deletes a service usage record.
 *
 * @param serviceUsageId The ID of the service usage to delete.
 * @returns A promise that resolves to the deleted service usage data.
 */
export const deleteServiceUsage = async (serviceUsageId: string) => {
  try {
    const response = await api.delete(`/service-usages/${serviceUsageId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting service usage:", error);
    throw error;
  }
};

/**
 * Updates a booking.
 *
 * @param bookingId The ID of the booking to update.
 * @param payload The payload for the update.
 * @returns A promise that resolves to the updated booking data.
 */
export const updateBooking = async (
  bookingId: string,
  payload: Partial<UpdateBookingData>
) => {
  try {
    const response = await api.put(`/bookings/${bookingId}`, payload);
    return response.data;
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
};

/**
 * Updates the status of a booking to "Completed".
 *
 * @param bookingId The ID of the booking to update.
 * @returns A promise that resolves to the updated booking data.
 */
export const updateBookingStatus = async (bookingId: string) => {
  try {
    const response = await api.put(`/bookings/${bookingId}`, {
      data: {
        booking_status: BookingStatus.Completed,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating booking status:", error);
    throw error;
  }
};

/**
 * Updates the status of a room to "Occupied".
 *
 * @param roomId The ID of the room.
 * @returns A promise that resolves to the updated room data.
 */
export const updateRoomStatusOccupied = async (roomId: string) => {
  try {
    const response = await api.put(`/rooms/${roomId}`, {
      data: {
        room_status: RoomStatus.Occupied,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating room status to occupied:", error);
    throw error;
  }
};

/**
 * Updates the status of a room to "Available".
 *
 * @param roomId The ID of the room to update.
 * @returns A promise that resolves to the updated room data.
 */
export const updateRoomStatusAvailable = async (roomId: string) => {
  try {
    const response = await api.put(`/rooms/${roomId}`, {
      data: {
        room_status: RoomStatus.Available,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating room status to available:", error);
    throw error;
  }
};

/**
 * Creates a new payment record.
 *
 * @param payload The payload for the new payment.
 * @returns A promise that resolves to the created payment data.
 */
export const createPayment = async (payload: CreatePaymentPayload) => {
  try {
    const response = await api.post(`/reservations`, payload);
    return response.data;
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
};

/**
 * Fetches the hotel profile.
 *
 * @returns A promise that resolves to the hotel profile data.
 */
export const getHotelProfile = async () => {
  try {
    const response = await api.get(`/hotels?populate=*`);
    return response.data.data[0];
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
};

/**
 * Fetches reservations from a given date to a given end date.
 *
 * @param startDate The start date.
 * @param endDate The end date.
 * @returns A promise that resolves to the reservations data.
 */
export const getReservationsFromDate = async (
  startDate: string | Date,
  endDate: string | Date
) => {
  const params = {
    "filters[date][$gte]": startDate,
    "filters[date][$lte]": endDate,
  };

  try {
    const response = await api.get(`/reservations?populate=*`, { params });
    return response.data;
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
};

/**
 * Fetches revenue data from a given date to a given end date.
 *
 * @param date The start date.
 * @param endDate The end date.
 * @returns A promise that resolves to the revenue data.
 */
export const getRevenueData = async () => {
  try {
    const response = await api.get(`/reservations?&sort=date:DESC&populate=*`);
    return response;
  } catch (error) {
    console.error("Error fetching revenue data:", error);
    throw error;
  }
};

/**
 * Fetches revenue data for a given year.
 *
 * @param year The year for which to fetch revenue data.
 * @returns A promise that resolves to the revenue data.
 *
 **/

export const getYearlyStat = async (
  year?: string | number
): Promise<yearlyStat[]> => {
  try {
    const defaultYear = new Date().getFullYear();
    const yearParams = year ? year : defaultYear;
    const response = await api.get(
      `/reservations/yearly-stats?year=${yearParams}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching revenue data:", error);
    throw error;
  }
};

/**
 * Fetches revenue data for a given month.
 *
 * @param startDate The startDate for which to fetch revenue data.
 * @param endDate The month for which to fetch revenue data (1-12).
 * @returns A promise that resolves to the
 */

export const getDailyRevenue = async (
  startDate: Date | string = "",
  endDate: Date | string = ""
): Promise<dailyStat[]> => {
  try {
    const response = await api.get(
      `/reservations/daily-revenue?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching revenue data:", error);
    throw error;
  }
};

/**
 * Fetches room data for a given month.
 *
 * @param startDate The startDate for which to fetch room data.
 * @param endDate The month for which to fetch room data (1-12).
 * */
export const getCompareDailyRevenue = async (): Promise<compareDaily> => {
  try {
    const response = await api.get(`/reservations/compare-daily-revenue`);
    return response.data;
  } catch (error) {
    console.error("Error fetching revenue data:", error);
    throw error;
  }
};

/**
 * Fetches room data for a given month.
 *
 * @param startDate The startDate for which to fetch room data.
 * @param endDate The month for which to fetch room data (1-12).
 * */
export const getSearchData = async (payload: string) => {
  try {
    const response = await api.get(`/reservations/search?search=${payload}`);
    return response;
  } catch (error) {
    console.error("Error fetching revenue data:", error);
    throw error;
  }
};

/**
 * Deletes a reservation by ID.
 *
 * @param id The ID of the reservation to delete.
 * @returns A promise that resolves to the deleted reservation data.
 * */
export const deleteReservations = async (id: string) => {
  try {
    const response = await api.delete(`/reservations/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting reservations:", error);
    throw error;
  }
};

export const getReservationsPagination = async (
  start: number,
  limit: number
) => {
  try {
    const response = await api.get(
      `/reservations?pagination[start]=${start}&pagination[limit]=${limit}&populate=*&sort=date:DESC`
    );
    return response;
  } catch (error) {
    console.error("Error deleting reservations:", error);
    throw error;
  }
};
