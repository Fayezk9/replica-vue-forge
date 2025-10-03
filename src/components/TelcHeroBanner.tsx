import telcExamImage from "@/assets/telc-exam-student.jpg";

export const TelcHeroBanner = () => {
  return (
    <section className="bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden rounded-lg shadow-xl">
          {/* Left side - Image */}
          <div className="relative h-[400px] md:h-auto">
            <img
              src={telcExamImage}
              alt="telc Prüfung"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right side - Blue banner with telc logo */}
          <div className="bg-primary flex flex-col items-center justify-center p-12 text-center text-primary-foreground">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              telc-Prüfungen
            </h1>
            <p className="text-2xl mb-8">bei inlingua Dortmund</p>
            
            {/* telc Logo Box */}
            <div className="bg-background p-6 rounded-lg mb-6">
              <div className="text-foreground">
                <p className="text-xs font-semibold mb-2">LIZENZIERTES</p>
                <p className="text-xs font-semibold mb-2">PRÜFUNGSZENTRUM</p>
                <p className="text-4xl font-bold mb-1">telc</p>
                <p className="text-xs font-semibold">LANGUAGE TESTS</p>
              </div>
            </div>

            <p className="text-xl font-semibold">Im Herzen Dortmunds</p>
          </div>
        </div>
      </div>
    </section>
  );
};
