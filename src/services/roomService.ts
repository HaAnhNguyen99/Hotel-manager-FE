import { RoomStatus } from "../types/room";
import axios from "axios";
const POPULATE_ALL = process.env.VITE_POPULATE_ALL;

/**
 * Creates a single Axios instance for making HTTP requests to the API.
 * Configures base URL from environment variables and sets default headers.
 */
export const api = axios.create({
  baseURL: process.env.VITE_API_URL,
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

export const getRooms = async () => {
  try {
    const response = await api.get(`/rooms${POPULATE_ALL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching rooms data:", error);
    throw error;
  }
};

interface RoomsPayload {
  room_number: number;
  floor: number;
  room_status: RoomStatus;
  price_per_night: number;
  first_hourly_price: number;
  after_hour_price: number;
  img: number;
}

export const createRooms = async (data: RoomsPayload) => {
  try {
    const payload = {
      data,
    };
    const response = await api.post(`/rooms`, payload);
    return response.data;
  } catch (error) {
    console.error("Error when  create room:", error);
    throw new Error("Error when create room");
  }
};

export const updateRooms = async (id: string, data: Partial<RoomsPayload>) => {
  try {
    const response = await api.put(`/rooms/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error when update room:", error);
    throw error;
  }
};

export const deleteRooms = async (id: string) => {
  try {
    const response = await api.delete(`/rooms/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error when delete room:", error);
    throw error;
  }
};
