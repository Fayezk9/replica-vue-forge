import { supabase } from "@/integrations/supabase/client";

const IMAGE_URL = "https://cdn.builder.io/api/v1/image/assets%2Fd5ceaaf188a440b69293546711d11d26%2F4b0fb939bdd746459fdb0ab21452ae5b?format=webp&width=800";

export async function uploadHeroImageToSupabase(): Promise<string | null> {
  try {
    // Call the edge function with service role permissions
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/upload-hero-image`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ imageUrl: IMAGE_URL }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to upload image");
    }

    const data = await response.json();
    return data.publicUrl;
  } catch (error) {
    console.error("Error uploading hero image:", error);
    return null;
  }
}
