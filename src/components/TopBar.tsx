import { Phone, Mail, MapPin, Search } from "lucide-react";
import { Button } from "./ui/button";

export const TopBar = () => {
  return (
    <div className="bg-secondary border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-12 text-sm">
          <div className="flex items-center gap-4">
            <span className="font-medium">DORTMUND</span>
            <Button variant="outline" size="sm">My School</Button>
          </div>
          <div className="flex items-center gap-6">
            <a href="tel:+4915238455744" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              <span>+49 15238455744</span>
            </a>
            <a href="mailto:info@inlinguadortmund.de" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail className="w-4 h-4" />
              <span>info@inlinguadortmund.de</span>
            </a>
            <a href="#kontakt" className="hover:text-primary transition-colors">
              Kontakt
            </a>
            <button className="flex items-center gap-2 hover:text-primary transition-colors">
              <Search className="w-4 h-4" />
              <span>Suche</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
