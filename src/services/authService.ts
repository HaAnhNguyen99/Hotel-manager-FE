import { LoginPayload } from "@/types/login";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Fetches all rooms sorted by room number with related data populated.
 *
 * @returns {Promise<FetchRoom>} The API response containing room data.
 * @throws {Error} If the request fails.
 */

export const login = async (payload: LoginPayload) => {
  try {
    const response = await api.post("/auth/local", payload);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Sai tên đăng nhập hoặc mật khẩu");
  }
};
