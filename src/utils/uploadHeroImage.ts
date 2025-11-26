import { supabase } from "@/integrations/supabase/client";

const IMAGE_URL = "https://cdn.builder.io/api/v1/image/assets%2Fd5ceaaf188a440b69293546711d11d26%2F4b0fb939bdd746459fdb0ab21452ae5b?format=webp&width=800";
const BUCKET_NAME = "Images";
const FILE_NAME = "background-hero-image.webp";

export async function uploadHeroImageToSupabase(): Promise<string | null> {
  try {
    // Fetch the image
    const imageResponse = await fetch(IMAGE_URL);
    if (!imageResponse.ok) {
      throw new Error("Failed to fetch image");
    }

    const imageBlob = await imageResponse.blob();

    // Check if bucket exists, if not create it
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some((b) => b.name === BUCKET_NAME);

    if (!bucketExists) {
      await supabase.storage.createBucket(BUCKET_NAME, {
        public: true,
      });
    }

    // Upload image to storage
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(FILE_NAME, imageBlob, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      throw new Error(error.message);
    }

    // Get public URL
    const { data: publicData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(FILE_NAME);

    return publicData.publicUrl;
  } catch (error) {
    console.error("Error uploading hero image:", error);
    return null;
  }
}

export function getHeroImageUrl(): string {
  return `${supabase.storage.from(BUCKET_NAME).getPublicUrl(FILE_NAME).data.publicUrl}`;
}
