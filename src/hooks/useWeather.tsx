import { getWeather } from "@/services/landingpageService";
import { WeatherApiResponse } from "@/types/landingpage";
import { useEffect, useState } from "react";

const useWeather = () => {
  const [weather, setWeather] = useState<WeatherApiResponse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null as string | null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await getWeather();
        if (!res) {
          throw new Error("No weather data received");
        }

        const { main, weather, name } = res;
        setWeather({ main, weather, name });
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || "Failed to fetch weather data");
          console.error("Weather fetch error:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  return { weather, loading, error };
};

export default useWeather;
