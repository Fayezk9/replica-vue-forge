import heroStudents from "@/assets/hero-students.jpg";

export const Hero = () => {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <img
        src={heroStudents}
        alt="Students learning German at inlingua Dortmund"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif">
          Deutsch lernen in Dortmund
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Professionelle Sprachkurse für Anfänger und Fortgeschrittene
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/kurse"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-md font-medium transition-colors"
          >
            Kurse entdecken
          </a>
          <a
            href="/telc-prufungen"
            className="bg-white/20 hover:bg-white/30 text-white border border-white/50 px-8 py-3 rounded-md font-medium transition-colors backdrop-blur-sm"
          >
            telc Prüfungen
          </a>
        </div>
      </div>
    </section>
  );
};
