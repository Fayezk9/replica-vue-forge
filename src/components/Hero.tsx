export const Hero = () => {
  // Using the original Builder.io URL without any compression or processing
  const imageUrl = "https://cdn.builder.io/api/v1/image/assets%2Fd5ceaaf188a440b69293546711d11d26%2Fa788ed82a2704e1fb8f28ea1a9c76de3";

  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-gray-100">
      <img
        src={imageUrl}
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ imageRendering: "auto" }}
        loading="eager"
      />
    </section>
  );
};
