import { useEffect, useState } from "react";
import { getHeroImg } from "@/services/landingpageService";

export const useHeroImage = () => {
  const [heroImgPath, setHeroImgPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchHeroImg = async () => {
      try {
        setLoading(true);
        const res = await getHeroImg();
        setHeroImgPath(res.data.img.url);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch hero image");
      } finally {
        setLoading(false);
      }
    };

    fetchHeroImg();
  }, []);

  return { heroImgPath, loading, error };
};
