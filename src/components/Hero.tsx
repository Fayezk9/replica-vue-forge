import heroImage from "@/assets/hero-students.jpg";

export const Hero = () => {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/30" />
      </div>
      
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-lg">
          Und die Welt steht Ihnen offen.
        </h1>
        <p className="text-xl md:text-2xl font-sans drop-shadow-md">
          inlingua Sprachschule Dortmund
        </p>
      </div>
    </section>
  );
};
