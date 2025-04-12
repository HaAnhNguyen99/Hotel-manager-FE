import { WeatherApiResponse } from "@/types/landingpage";
import axios from "axios";
const POPULATE_ALL = import.meta.env.VITE_POPULATE_ALL;
const weatherAPI = import.meta.env.VITE_WEATHER_API_KEY;
const location = "Saigon";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getHeroImg = async () => {
  try {
    const response = await api.get(`/hero-section${POPULATE_ALL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw new Error("Failed to fetch rooms");
  }
};

export const getAmenities = async () => {
  try {
    const response = await api.get(`/amenity${POPULATE_ALL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw new Error("Failed to fetch rooms");
  }
};

export const getPropertySectionData = async () => {
  try {
    const response = await api.get(`/property-section${POPULATE_ALL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw new Error("Failed to fetch rooms");
  }
};

export const getSafetyAndHygieneInfo = async () => {
  try {
    const response = await api.get(`/safety-and-hygiene${POPULATE_ALL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw new Error("Failed to fetch rooms");
  }
};

export const getWeather = async (): Promise<WeatherApiResponse | undefined> => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weatherAPI}&units=metric&lang=vi`
    );
    return response.data;
  } catch {
    return;
  }
};
