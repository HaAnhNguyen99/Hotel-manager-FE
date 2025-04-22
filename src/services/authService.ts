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

export const forgotPassword = async (email: string) => {
  try {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Có lỗi xảy ra, vui lòng thử lại sau.");
  }
};

export const resetPassword = async (payload: {
  code: string;
  password: string;
  passwordConfirmation: string;
}) => {
  try {
    const response = await api.post("/auth/reset-password", payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        throw new Error(
          "Liên kết đã hết hạn. Vui lòng yêu cầu đặt lại mật khẩu mới."
        );
      }
    }
    throw new Error("Có lỗi xảy ra, vui lòng thử lại sau.");
  }
};
