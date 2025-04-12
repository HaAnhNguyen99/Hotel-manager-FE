import { useEffect, useState } from "react";
import { getAmenities } from "@/services/landingpageService";

export const useProperty = () => {
  const [propertyImgPath, setPropertyImgPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchHeroImg = async () => {
      try {
        setLoading(true);
        const res = await getAmenities();
        setPropertyImgPath(res.data.img.url);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch hero image");
      } finally {
        setLoading(false);
      }
    };

    fetchHeroImg();
  }, []);

  return { propertyImgPath, loading, error };
};
