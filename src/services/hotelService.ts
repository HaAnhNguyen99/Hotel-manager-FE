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
import {
  compareDaily,
  dailyStat,
  RevenueData,
  yearlyStat,
} from "@/types/reservation";
import { getTodayISODate } from "@/utils/getTodayISODate";
import { ChangePasswordParams } from "@/types/login";
import { ServiceFormData } from "@/Pages/Setting/ServiceFormDialog";
const POPULATE_ALL = import.meta.env.VITE_POPULATE_ALL;

/**
 * Creates a single Axios instance for making HTTP requests to the API.
 * Configures base URL from environment variables and sets default headers.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Axios request interceptor that adds the authentication token to all API requests.
 *
 * This interceptor runs before each API request and:
 * 1. Retrieves the JWT token from local storage using getAuthToken()
 * 2. If a token exists, adds it to the request headers as a Bearer token
 * 3. Returns the modified config to continue the request
 *
 * @param {AxiosRequestConfig} config - The Axios request configuration object
 * @returns {AxiosRequestConfig} The modified request config with auth headers if a token exists
 */
api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Retrieves the authentication token (JWT) from localStorage or sessionStorage.
 *
 * @returns {string | null} The JWT token if available, otherwise null.
 */

const getAuthToken = () => {
  try {
    const userData =
      localStorage.getItem("user") || sessionStorage.getItem("user");
    if (!userData) return null;

    const user = JSON.parse(userData);
    return user?.jwt || null;
  } catch (error) {
    console.error("Lỗi khi lấy token từ localStorage:", error);
    return null;
  }
};

/**
 * Sends a request to change the user's password.
 *
 * @param {Object} params - Parameters for changing the password.
 * @param {string} params.currentPassword - The user's current password.
 * @param {string} params.newPassword - The new password the user wants to set.
 * @param {string} params.confirmNewPassword - Confirmation of the new password.
 * @returns {Promise<any>} - The response data from the API if the password change is successful.
 * @throws {Error} - Throws an error if the current password is invalid or if another error occurs.
 */

export const changePassword = async ({
  currentPassword,
  newPassword,
  confirmNewPassword,
}: ChangePasswordParams) => {
  try {
    const response = await api.post("/auth/change-password", {
      currentPassword,
      password: newPassword,
      passwordConfirmation: confirmNewPassword,
    });

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (
        err?.response?.data?.error?.status === 400 &&
        err?.response?.data?.error?.message ===
          "The provided current password is invalid"
      ) {
        const message = "Mật khẩu cũ không đúng hoặc sai cú pháp";
        throw new Error(message);
      } else {
        const message = "Lỗi khi đổi mật khẩu";
        throw new Error(message);
      }
    }
  }
};

/**
 * Fetches all rooms sorted by room number with related data populated.
 *
 * @returns {Promise<FetchRoom>} The API response containing room data.
 * @throws {Error} If the request fails.
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
 * Fetches the pending booking for a specific room.
 *
 * @param {string} roomId - The document ID of the room.
 * @returns {Promise<RoomBooking>} The pending booking data for the room.
 * @throws {Error} If the request fails.
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
 * Fetches all service data from the API with full population.
 *
 * This function sends a GET request to the `services` endpoint, including all
 * relational data using the `POPULATE_ALL` query string. It returns the full
 * API response if successful, or logs and rethrows an error if the request fails.
 *
 * @async
 * @function getServices
 * @returns {Promise<Object>} The response object containing the services data.
 * @throws Will throw an error if the API request fails.
 *
 */

export const getServices = async () => {
  try {
    const response = await api.get(`services${POPULATE_ALL}`);
    return response;
  } catch (error) {
    console.error("Error fetching services data:", error);
    throw error;
  }
};

/**
 * Creates a new service usage entry with the provided data.
 *
 * @param {CreateServiceUsagePayload} payload - The service usage details to be sent.
 * @returns {Promise<Object>} The API response containing the created service usage data.
 * @throws {Error} If the request fails.
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
 * Creates a new booking with the provided data.
 *
 * @param {CreateBookingType} payload - The booking details to be sent.
 * @returns {Promise<Object>} The API response containing the created booking data.
 * @throws {Error} If the request fails.
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
 * Cancels a booking by deleting it from the system.
 *
 * @param {string} bookingId - The ID of the booking to cancel.
 * @returns {Promise<Object>} The API response confirming the cancellation.
 * @throws {Error} If the request fails.
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
 * Fetches all service usage entries for a given booking.
 *
 * @param {string} bookingId - The document ID of the booking.
 * @returns {Promise<Object[]>} The API response containing service usage entries.
 * @throws {Error} If the request fails.
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
 * Fetches unpaid service usage entries for a given booking.
 *
 * @param {string} bookingId - The document ID of the booking.
 * @returns {Promise<Object[]>} The API response containing unpaid service usage entries.
 * @throws {Error} If the request fails.
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
 * Updates a service usage entry with the provided data.
 *
 * @param {string} serviceUsageId - The ID of the service usage to update.
 * @param {UpdateServiceUsagePayload} payload - The updated service usage data.
 * @returns {Promise<Object>} The API response containing the updated service usage data.
 * @throws {Error} If the request fails.
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
 * Updates the payment status of a service usage.
 *
 * @param {string} serviceUsageId - The ID of the service usage to update.
 * @param {string} service_status - The new status of the service usage.
 * @returns {Promise<void>} Resolves when the update is successful.
 * @throws {Error} If the request fails.
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
 * Deletes a service usage entry by ID.
 *
 * @param {string} serviceUsageId - The ID of the service usage to delete.
 * @returns {Promise<Object>} The API response confirming the deletion.
 * @throws {Error} If the request fails.
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
 * Updates a booking with the provided data.
 *
 * @param {string} bookingId - The ID of the booking to update.
 * @param {Partial<UpdateBookingData>} payload - The updated booking data.
 * @returns {Promise<Object>} The API response containing the updated booking data.
 * @throws {Error} If the request fails.
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
 * @param {string} bookingId - The ID of the booking to update.
 * @returns {Promise<Object>} The API response containing the updated booking data.
 * @throws {Error} If the request fails.
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
 * @param {string} roomId - The ID of the room to update.
 * @returns {Promise<Object>} The API response containing the updated room data.
 * @throws {Error} If the request fails.
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
 * @param {string} roomId - The ID of the room to update.
 * @returns {Promise<Object>} The API response containing the updated room data.
 * @throws {Error} If the request fails.
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
 * Creates a new payment for a reservation.
 *
 * @param {CreatePaymentPayload} payload - The payment details to be sent.
 * @returns {Promise<Object>} The API response containing the created payment data.
 * @throws {Error} If the request fails.
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
 * Fetches the hotel profile with all related data.
 *
 * @returns {Promise<Object>} The API response containing hotel profile data.
 * @throws {Error} If the request fails.
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
 * Fetches reservations within a specified date range.
 *
 * @param {string | Date} startDate - The start date for filtering reservations.
 * @param {string | Date} endDate - The end date for filtering reservations.
 * @returns {Promise<RevenueData[]>} The API response containing filtered reservations data.
 * @throws {Error} If the request fails.
 */

export const getReservationsFromDate = async (
  startDate: string | Date,
  endDate: string | Date
): Promise<RevenueData[]> => {
  const params = {
    "filters[date][$gte]": startDate,
    "filters[date][$lte]": endDate,
    populate: "*",
  };

  try {
    const response = await api.get(`/reservations`, { params });
    return response.data.data;
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
};

/**
 * Fetches revenue data sorted by date in descending order.
 *
 * @returns {Promise<Object>} The API response containing revenue data.
 * @throws {Error} If the request fails.
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
 * Fetches yearly revenue statistics for a given year.
 *
 * @param {string | number} [year] - The year for the query. Defaults to the current year if not provided.
 * @returns {Promise<yearlyStat[]>} The API response containing yearly revenue statistics.
 * @throws {Error} If the request fails.
 */

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
 * Fetches daily revenue statistics for a given date range.
 *
 * @param {Date | string} [startDate=""] - The start date for the query.
 * @param {Date | string} [endDate=""] - The end date for the query.
 * @returns {Promise<dailyStat[]>} The API response containing daily revenue statistics.
 * @throws {Error} If the request fails.
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
 * Fetches and compares daily revenue data.
 *
 * @returns {Promise<compareDaily>} The API response containing daily revenue comparison data.
 * @throws {Error} If the request fails.
 */

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
 * Searches for reservations based on a given query string.
 *
 * @param {string} payload - The search query.
 * @returns {Promise<Object>} The API response containing matching reservations.
 * @throws {Error} If the request fails.
 */

export const getSearchData = async (payload: string) => {
  try {
    const response = await api.get(
      `/reservations/search?search=${payload}&pagination[start]=0&pagination[limit]=10`
    );
    return response;
  } catch (error) {
    console.error("Error fetching revenue data:", error);
    throw error;
  }
};

/**
 * Fetches a paginated list of reservations.
 *
 * @param {number} start - The starting index for pagination.
 * @param {number} limit - The number of reservations to fetch per page.
 * @returns {Promise<Object>} The API response containing reservations data.
 * @throws {Error} If the request fails.
 */
export const deleteReservations = async (id: string) => {
  try {
    const response = await api.delete(`/reservations/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting reservations:", error);
    throw error;
  }
};

/**
 * Fetches reservations data with pagination.
 *
 * @param start The start index for pagination.
 * @param limit The number of records to fetch per page.
 * */

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

/**
 * Fetches today's room reservations, categorizes them by type, and calculates total revenue.
 *
 * @returns {Promise<Object>} An object containing:
 *   - todayHourRoom {number}: Number of hourly bookings.
 *   - todayOvernightRoom {number}: Number of overnight bookings.
 *   - totalRevenue {number}: Total revenue for today.
 *   - totalRooms {number}: Total number of bookings today.
 */

export const getTodayRooms = async () => {
  const { startDate, endDate } = getTodayISODate();
  const TodayData = await getReservationsFromDate(startDate, endDate);

  return TodayData;
};

/**
 * Uploads a file to the server and returns its uploaded file ID.
 *
 * This function creates a FormData object containing the file,
 * attaches the authorization token from localStorage/sessionStorage,
 * and sends a POST request to the `/upload` endpoint.
 *
 * @async
 * @function uploadFile
 * @param {File} file - The file to be uploaded.
 * @returns {Promise<number>} The ID of the uploaded file.
 * @throws {Error} If no authentication token is found or if the upload fails.
 */
export const uploadFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("files", file);

    const token = getAuthToken();
    if (!token) {
      throw new Error("Không có token, không thể tải ảnh lên");
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data[0].id;
  } catch (err) {
    console.error("Error uploading file:", err);
    throw new Error("Lỗi khi tải ảnh lên");
  }
};

/**
 * Creates a new service with the given name, price, and image.
 *
 * Sends a POST request to the `/services` endpoint with the service data,
 * including the name, price, and the ID of the uploaded image.
 *
 * @async
 * @function createService
 * @param {ServiceFormData} data - The form data containing the service name and price.
 * @param {number} fileId - The ID of the uploaded image used as the service thumbnail.
 * @returns {Promise<void>} Resolves when the service is successfully created, otherwise throws an error.
 * @throws {Error} If no authentication token is found or if the request fails.
 */
export const createService = async (data: ServiceFormData, fileId: number) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Không có token, không thể tạo dịch vụ");
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const payload = {
      data: {
        name: data.serviceName,
        price: data.price,
        img: fileId,
      },
    };

    await axios.post("/services", payload);
    return;
  } catch (err) {
    console.error("Error creating service:", err);
    throw new Error("Lỗi khi tạo dịch vụ");
  }
};

/**
 * Deletes a service by its ID.
 *
 * Sends a DELETE request to the API to remove the specified service.
 *
 * @async
 * @function deleteService
 * @param {string} id - The ID of the service to delete.
 * @returns {Promise<Object>} The API response confirming the deletion.
 * @throws {Error} If the request fails, an error is thrown and logged.
 */
export const deleteService = async (id: string) => {
  try {
    const response = await api.delete(`/services/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
};

export const updateService = async (
  id: string,
  ServiceData: ServiceFormData,
  fileId?: number
) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Không có token, không thể tạo dịch vụ");
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const payload = {
      data: {
        name: ServiceData.serviceName,
        price: ServiceData.price,
        img: fileId,
      },
    };

    await axios.put(`/services/${id}`, payload);
    return;
  } catch (err) {
    console.error("Error updating service:", err);
    throw new Error("Lỗi khi cập nhật dịch vụ");
  }
};

export const searchService = async (name: string) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Không có token, không thể tạo dịch vụ");
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.get(
      "/services?filters[name][$contains]=" + name + "&populate=*"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching services data:", error);
    throw error;
  }
};
