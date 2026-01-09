import { Hero } from "@/components/Hero";
import { WelcomeSection } from "@/components/WelcomeSection";
import { ServicesSection } from "@/components/ServicesSection";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center">
                <span className="text-background font-bold text-xl">i</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl">inlingua</span>
                <span className="text-sm text-muted-foreground">Dortmund</span>
              </div>
            </div>
            <nav className="flex items-center gap-6">
              <Link to="/kurse" className="text-foreground hover:text-primary transition-colors">
                Deutschkurse
              </Link>
              <Link to="/telc-prufungen" className="text-foreground hover:text-primary transition-colors">
                telc Prüfungen
              </Link>
              <a href="#kontakt" className="text-foreground hover:text-primary transition-colors">
                Kontakt
              </a>
            </nav>
          </div>
        </div>
      </header>
      <main>
        <Hero />
        <WelcomeSection />
        <ServicesSection />
      </main>
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} inlingua Dortmund. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
