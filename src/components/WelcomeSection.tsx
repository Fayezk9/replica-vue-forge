import communityImage from "@/assets/community-globe.jpg";
import dortmundImage from "@/assets/dortmund-u.jpg";

export const WelcomeSection = () => {
  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Sprachen sind inlingua
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="overflow-hidden rounded-lg shadow-lg">
            <img
              src={communityImage}
              alt="Internationale Gemeinschaft"
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="overflow-hidden rounded-lg shadow-lg">
            <img
              src={dortmundImage}
              alt="Dortmunder U"
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="flex items-center justify-center bg-primary text-primary-foreground rounded-lg shadow-lg p-8">
            <div className="text-center">
              <h3 className="font-serif text-3xl font-bold mb-2">Willkommen bei</h3>
              <p className="font-serif text-4xl font-bold">inlingua Dortmund</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
