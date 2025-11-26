import { MapPin, Phone, Mail } from "lucide-react";
import { CONTACT } from "@/config/constants";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">{CONTACT.COMPANY_NAME}</h3>
            <p className="text-sm opacity-90">
              Ihre Sprachschule in Dortmund für professionelle Sprachkurse und Zertifikate.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Kontakt</h4>
            <div className="space-y-2 text-sm opacity-90">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>{CONTACT.LOCATION}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href={`tel:${CONTACT.PHONE}`} className="hover:opacity-70 transition-opacity">
                  {CONTACT.PHONE}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href={`mailto:${CONTACT.EMAIL}`} className="hover:opacity-70 transition-opacity">
                  {CONTACT.EMAIL}
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Schnelllinks</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <a href="#intensivkurse" className="hover:opacity-70 transition-opacity">
                  Intensivkurse
                </a>
              </li>
              <li>
                <a href="#telc" className="hover:opacity-70 transition-opacity">
                  telc-Prüfungen
                </a>
              </li>
              <li>
                <a href="#integration" className="hover:opacity-70 transition-opacity">
                  Integrationskurse
                </a>
              </li>
              <li>
                <a href="#kontakt" className="hover:opacity-70 transition-opacity">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm opacity-75">
          <p>&copy; {new Date().getFullYear()} {CONTACT.COMPANY_NAME}. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
};
