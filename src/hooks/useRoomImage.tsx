import { useEffect, useState } from "react";
import { getSafetyAndHygieneInfo } from "@/services/landingpageService";
import { PropertyResponse } from "@/types/landingpage";

export const useRoomImage = () => {
  const [roomImagePath, setRoomImagePath] = useState<PropertyResponse[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchHeroImg = async () => {
      try {
        setLoading(true);
        const res = await getSafetyAndHygieneInfo();
        setRoomImagePath(res.data.img);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch property image");
      } finally {
        setLoading(false);
      }
    };

    fetchHeroImg();
  }, []);

  return { roomImagePath, loading, error };
};
