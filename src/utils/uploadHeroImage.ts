const IMAGE_URL = "https://cdn.builder.io/api/v1/image/assets%2Fd5ceaaf188a440b69293546711d11d26%2F68fe49370f5d46d5be595a3f13105b6a?quality=100&width=2400";

export async function uploadHeroImageToSupabase(): Promise<string | null> {
  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl) {
      throw new Error("VITE_SUPABASE_URL is not set");
    }

    const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    if (!anonKey) {
      throw new Error("VITE_SUPABASE_PUBLISHABLE_KEY is not set");
    }

    const functionUrl = `${supabaseUrl}/functions/v1/upload-hero-image`;
    console.log("Calling Edge Function at:", functionUrl);

    const response = await fetch(functionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${anonKey}`,
      },
      body: JSON.stringify({ imageUrl: IMAGE_URL }),
    });

    const responseText = await response.text();
    console.log("Edge Function response:", responseText, "Status:", response.status);

    if (!response.ok) {
      try {
        const error = JSON.parse(responseText);
        throw new Error(error.error || `HTTP ${response.status}`);
      } catch {
        throw new Error(`HTTP ${response.status}: ${responseText}`);
      }
    }

    const data = JSON.parse(responseText);
    console.log("Upload successful, public URL:", data.publicUrl);
    return data.publicUrl;
  } catch (error) {
    console.error("Error uploading hero image:", error);
    return null;
  }
}
