import { Phone, Mail, MapPin, Search } from "lucide-react";
import { Button } from "./ui/button";

export const TopBar = () => {
  return (
    <div className="bg-secondary border-b border-border transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-12 text-sm">
          <div className="flex items-center gap-4">
            <span className="font-medium transition-all duration-200">DORTMUND</span>
            <Button variant="outline" size="sm">My School</Button>
          </div>
          <div className="flex items-center gap-6">
            <a href="tel:+4915238455744" className="flex items-center gap-2 hover:text-primary transition-all duration-200 hover:-translate-y-0.5 group">
              <Phone className="w-4 h-4 transition-transform duration-200 group-hover:rotate-12" />
              <span>+49 15238455744</span>
            </a>
            <a href="mailto:info@inlinguadortmund.de" className="flex items-center gap-2 hover:text-primary transition-all duration-200 hover:-translate-y-0.5 group">
              <Mail className="w-4 h-4 transition-transform duration-200 group-hover:rotate-12" />
              <span>info@inlinguadortmund.de</span>
            </a>
            <a href="#kontakt" className="hover:text-primary transition-all duration-200 relative group">
              Kontakt
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <button className="flex items-center gap-2 hover:text-primary transition-all duration-200 hover:-translate-y-0.5 group">
              <Search className="w-4 h-4 transition-transform duration-200 group-hover:rotate-12" />
              <span>Suche</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
