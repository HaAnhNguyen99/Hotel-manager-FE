import { getPropertySectionData } from "@/services/landingpageService";
import { useEffect, useState } from "react";

export const useProperty = () => {
  const [propertyImgPath, setPropertyImgPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchHeroImg = async () => {
      try {
        setLoading(true);
        const res = await getPropertySectionData();
        setPropertyImgPath(res.data.img.url);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch amentie images");
      } finally {
        setLoading(false);
      }
    };

    fetchHeroImg();
  }, []);

  return { propertyImgPath, loading, error };
};
