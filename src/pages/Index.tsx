import { Hero } from "@/components/Hero";
import { WelcomeSection } from "@/components/WelcomeSection";
import { ServicesSection } from "@/components/ServicesSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">i</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl">inlingua</span>
                <span className="text-sm text-gray-500">Dortmund</span>
              </div>
            </div>
            <nav className="flex items-center gap-6">
              <a href="/kurse" className="text-gray-700 hover:text-blue-600">Deutschkurse</a>
              <a href="/telc-prufungen" className="text-gray-700 hover:text-blue-600">telc Prüfungen</a>
              <a href="#kontakt" className="text-gray-700 hover:text-blue-600">Kontakt</a>
            </nav>
          </div>
        </div>
      </header>
      <main>
        <Hero />
        <WelcomeSection />
        <ServicesSection />
      </main>
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} inlingua Dortmund. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
