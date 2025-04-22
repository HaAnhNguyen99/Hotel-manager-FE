import { useEffect, useState } from "react";
import { getPropertySectionData } from "@/services/landingpageService";
import { PropertyResponse } from "@/types/landingpage";

export const useProperty = () => {
  const [propertyImgPath, setPropertyImgPath] = useState<PropertyResponse[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchHeroImg = async () => {
      try {
        setLoading(true);
        const res = await getPropertySectionData();
        setPropertyImgPath(res.data.img);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch property image");
      } finally {
        setLoading(false);
      }
    };

    fetchHeroImg();
  }, []);

  return { propertyImgPath, loading, error };
};
