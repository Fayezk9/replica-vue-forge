import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { TelcHeroBanner } from "@/components/TelcHeroBanner";
import { Footer } from "@/components/Footer";
import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const TelcOverview = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />
      <main>
        <TelcHeroBanner />
        
        {/* Main Content Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                telc-Prüfungen bei inlingua Dortmund
              </h2>
              <p className="text-xl text-center mb-12 text-muted-foreground">
                inlingua Dortmund ist ein lizenziertes telc-Prüfungszentrum und bietet telc Tests für alle Niveaustufen von A1 bis C2 an.
              </p>

              {/* Important Information Card */}
              <Card className="mb-12">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-6">
                    Wichtige Hinweise zur telc Anmeldung bei inlingua Dortmund:
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <strong>Anmeldefrist:</strong> Die Anmeldung ist bis <strong>drei Wochen</strong> vor dem Prüfungstag möglich. Es gilt das Datum des Geldeingangs aus dem Konto von inlingua Dortmund.
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <strong>Die Anmeldung zur telc Prüfung</strong> ist möglich, solange es <strong>freie Plätze</strong> gibt.
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <strong>Nutzen Sie</strong> unser Online-Formular zur telc-Prüfungsanmeldung. Sollten Sie Probleme mit dem Anmeldeformular haben, senden Sie uns eine E-Mail an: <a href="mailto:info@inlinguadortmund.de" className="text-primary hover:underline">info@inlinguadortmund.de</a>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <strong>Persönliche Anmeldung im Büro:</strong> Montag bis Donnerstag 10:00 – 13:00 Uhr, inlingua Dortmund, Kampstr. 32-34, 44137 Dortmund (<strong>3. Etage</strong>)
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <strong>Wichtig:</strong> Erscheinen Sie bitte mindestens <strong>30 Minuten vor Prüfungsbeginn</strong>.
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <strong>Wichtig:</strong> Bringen Sie <strong>Ihren Ausweis oder Reisepass mit.</strong>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <strong>Ergebnis:</strong> Sie bekommen das Ergebnis in der Regel ca. <strong>4 bis 6 Wochen</strong> ab dem Prüfungsdatum.
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <strong>telc-Zertifikat</strong> für eine bestandene Prüfung ist <strong>unbegrenzt gültig</strong>.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* After Registration Info */}
              <Card className="mb-12">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-6">Nach der Anmeldung:</h3>
                  <p className="mb-6">
                    Nachdem Sie sich für die telc Prüfung angemeldet haben, erhalten Sie <strong>ca. 3 bis 4 Tage</strong> vor der Prüfung <strong>den genauen Prüfungsablauf per E-Mail</strong>.
                  </p>
                </CardContent>
              </Card>

              {/* Service Section */}
              <Card className="mb-12">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-6">telc inlingua-Service</h3>
                  <p className="mb-4">
                    Unser Service-Team hilft Ihnen gerne weiter. Wenn Sie Fragen zur Anmeldung haben, rufen Sie uns gerne an oder schreiben Sie uns eine E-Mail.
                  </p>
                  <p>
                    E-Mail-Adresse: <a href="mailto:info@inlinguadortmund.de" className="text-primary hover:underline font-semibold">info@inlinguadortmund.de</a>
                  </p>
                </CardContent>
              </Card>

              {/* Available Exam Levels */}
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-8">Verfügbare Prüfungsniveaus</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" size="lg" asChild className="h-auto py-4">
                    <a href="/telc-b1">
                      <div>
                        <div className="font-bold text-lg">telc B1</div>
                        <div className="text-sm text-muted-foreground">Allgemein</div>
                      </div>
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="h-auto py-4">
                    <a href="/telc-b2">
                      <div>
                        <div className="font-bold text-lg">telc B2</div>
                        <div className="text-sm text-muted-foreground">Allgemein</div>
                      </div>
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="h-auto py-4">
                    <a href="/telc-c1">
                      <div>
                        <div className="font-bold text-lg">telc C1</div>
                        <div className="text-sm text-muted-foreground">Hochschule</div>
                      </div>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TelcOverview;
