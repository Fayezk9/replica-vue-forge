import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export const TelcExamDetails = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const examDates = [
    "25.10.2025",
    "08.11.2025",
    "22.11.2025",
    "06.12.2025"
  ];

  const examTypes = [
    { value: "full", label: "Gesamtprüfung", price: "179,00 €" },
    { value: "written", label: "schriftlich", discount: "- 10,00 %" },
    { value: "oral", label: "mündlich", discount: "- 10,00 %" }
  ];

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <p className="text-sm text-muted-foreground mb-6">
            Startseite / B1 Prüfung / telc B1 Prüfung (allgemein)
          </p>

          {/* Title and Price */}
          <div className="flex items-start justify-between mb-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              telc B1 Prüfung (allgemein)
            </h2>
            <p className="text-3xl font-bold">179,00 €</p>
          </div>

          {/* Information List */}
          <Card className="mb-8">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                <p>
                  <strong>Deadline für telc Anmeldung:</strong> bis{" "}
                  <span className="text-red-600">drei Wochen</span> vor dem Prüfungstag möglich.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                <p>
                  Die Anmeldung zur telc Prüfung ist möglich, solange es{" "}
                  <span className="text-red-600">freie Plätze</span> gibt.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                <p>
                  <strong>Prüfungsort:</strong> inlingua Dortmund, Kampstr. 32-34 (4.Etage), 44137 Dortmund
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                <p>
                  <strong>Uhrzeit:</strong> ca. 09:00 – 17:30 Uhr
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                <p>
                  <strong>Ergebnis:</strong> in der Regel ca. 4 bis 6 Wochen ab dem Prüfungsdatum.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                <p>
                  <strong>telc-Zertifikate</strong> für eine bestandene Prüfung ist unbegrenzt gültig.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                <p>
                  Nach der Anmeldung erhalten ca.{" "}
                  <span className="text-red-600">3 bis 4 Tage</span> vor der Prüfung den{" "}
                  <span className="text-red-600">genauen Prüfungsablauf</span> per E-Mail.
                </p>
              </div>

              <div className="ml-8 space-y-2 text-sm">
                <p>• Wichtig: Erscheinen Sie bitte mindestens 30 Minuten vor Prüfungsbeginn.</p>
                <p>• Wichtig: Bringen Sie Ihren Ausweis oder Reisepass mit.</p>
              </div>
            </CardContent>
          </Card>

          {/* Booking Form */}
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <Label htmlFor="exam-date" className="mb-2 block">
                  Prüfungstermin auswählen *
                </Label>
                <Select value={selectedDate} onValueChange={setSelectedDate}>
                  <SelectTrigger id="exam-date" className="bg-background">
                    <SelectValue placeholder="Wählen Sie einen Termin" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {examDates.map((date) => (
                      <SelectItem key={date} value={date}>
                        {date}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="exam-type" className="mb-2 block">
                  Prüfungsart auswählen *
                </Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger id="exam-type" className="bg-background">
                    <SelectValue placeholder="Wählen Sie eine Prüfungsart" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {examTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label} {type.discount && `${type.discount}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="certificate" className="mb-2 block">
                  Prüfungszertifikat hochladen *
                </Label>
                <input
                  type="file"
                  id="certificate"
                  className="block w-full text-sm text-muted-foreground
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-primary file:text-primary-foreground
                    hover:file:bg-primary/90"
                />
              </div>

              <Button className="w-full" size="lg">
                Zur Kasse
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
