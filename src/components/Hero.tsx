import { useEffect, useState } from "react";
import { uploadHeroImageToSupabase } from "@/utils/uploadHeroImage";

export const Hero = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const url = await uploadHeroImageToSupabase();
        if (url) {
          setImageUrl(url);
        }
      } catch (error) {
        console.error("Failed to load hero image:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadImage();
  }, []);

  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-gray-100">
      {!isLoading && imageUrl && (
        <img
          src={imageUrl}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ imageRendering: "high-quality" }}
          loading="eager"
        />
      )}
    </section>
  );
};
