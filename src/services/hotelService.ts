import { CreateServiceUsagePayload } from "@/types/service";
import axios from "axios";
import {
  BookingStatus,
  CreateBookingData,
  CreateBookingPayload,
  UpdateBookingData,
} from "@/types/booking";
import {
  ServiceStatus,
  UpdateServiceUsagePayload,
} from "@/types/service_usage";
import { FetchRoom, RoomBooking, RoomStatus } from "@/types/room";
import { CreatePaymentPayload } from "@/types/payment";

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
interface CreateBookingType {
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
  service_status: ServiceStatus
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
  payload: UpdateBookingData
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
