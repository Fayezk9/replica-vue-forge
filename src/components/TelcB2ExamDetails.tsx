import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const TelcB2ExamDetails = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [certificateDelivery, setCertificateDelivery] = useState("office");
  const [uploadedCertificate, setUploadedCertificate] = useState<File | null>(null);
  const [uploadedIdPhoto, setUploadedIdPhoto] = useState<File | null>(null);

  // Check if certificate upload is required
  const isCertificateUploadRequired = selectedType === "written" || selectedType === "oral";
  
  // Check if all required fields are filled
  const isFormValid = 
    selectedDate !== "" && 
    selectedType !== "" && 
    certificateDelivery !== "" &&
    uploadedIdPhoto !== null &&
    (!isCertificateUploadRequired || uploadedCertificate !== null);

  const examDates = [
    "25.10.2025",
    "15.11.2025",
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
            Startseite / B2 Prüfung / telc B2 Prüfung (allgemein)
          </p>

          {/* Title and Price */}
          <div className="flex items-start justify-between mb-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              telc B2 Prüfung (allgemein)
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
                  <strong>Uhrzeit:</strong> ca. 09:00 – 16:30 Uhr
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
              {/* Exam Date Selection - Radio Buttons */}
              <div>
                <Label className="mb-3 block">
                  Prüfungstermin auswählen <span className="text-red-500">*</span>
                </Label>
                <RadioGroup value={selectedDate} onValueChange={setSelectedDate}>
                  <div className="flex flex-wrap gap-x-12 gap-y-1">
                    {examDates.map((date) => (
                      <div key={date} className="flex items-center space-x-2">
                        <RadioGroupItem value={date} id={`date-${date}`} />
                        <Label htmlFor={`date-${date}`} className="cursor-pointer font-normal">
                          {date}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Exam Type Selection - Radio Buttons */}
              <div>
                <Label className="mb-3 block">
                  Prüfungsart auswählen <span className="text-red-500">*</span>
                </Label>
                <RadioGroup value={selectedType} onValueChange={setSelectedType}>
                  <div className="space-y-2">
                    {examTypes.map((type) => (
                      <div key={type.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={type.value} id={`type-${type.value}`} />
                        <Label htmlFor={`type-${type.value}`} className="cursor-pointer font-normal">
                          {type.label}
                          {type.discount && (
                            <span className="text-yellow-600 ml-2">{type.discount}</span>
                          )}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Only show certificate upload for written or oral exams */}
              {isCertificateUploadRequired && (
                <div>
                  <Label className="mb-2 block pointer-events-none">
                    Prüfungszertifikat hochladen <span className="text-red-500">*</span>
                  </Label>
                  <input
                    type="file"
                    id="certificate"
                    required
                    onChange={(e) => setUploadedCertificate(e.target.files?.[0] || null)}
                    className="block w-full text-sm text-muted-foreground
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-primary file:text-primary-foreground
                      hover:file:bg-primary/90 file:cursor-pointer cursor-default"
                  />
                  {isCertificateUploadRequired && !uploadedCertificate && (
                    <p className="text-red-500 text-sm mt-1">Bitte laden Sie Ihr Zertifikat hoch</p>
                  )}
                </div>
              )}

              {/* Certificate/Result Delivery Method */}
              <div>
                <Label className="mb-3 block">
                  Zertifikat/Ergebnis <span className="text-red-500">*</span>
                </Label>

                <RadioGroup value={certificateDelivery} onValueChange={setCertificateDelivery}>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="office" id="office" />
                      <Label htmlFor="office" className="cursor-pointer font-normal">
                        Abholen im Büro
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="post" id="post" />
                      <Label htmlFor="post" className="cursor-pointer font-normal">
                        Per Post <span className="text-yellow-600">+ 8,00 €</span>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
                
                {/* ID Photo Upload */}
                <div className="mt-4">
                  <Label className="mb-2 block pointer-events-none">
                    Ausweisfoto hochladen <span className="text-red-500">*</span>
                  </Label>
                  <input
                    type="file"
                    id="idPhoto"
                    accept="image/*"
                    required
                    onChange={(e) => setUploadedIdPhoto(e.target.files?.[0] || null)}
                    className="block w-full text-sm text-muted-foreground
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-primary file:text-primary-foreground
                      hover:file:bg-primary/90 file:cursor-pointer cursor-default"
                  />
                  {!uploadedIdPhoto && (
                    <p className="text-red-500 text-sm mt-1">Bitte laden Sie Ihr Ausweisfoto hoch</p>
                  )}
                </div>
              </div>

              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed" 
                size="lg"
                disabled={!isFormValid}
                onClick={() => {
                  // Save cart data to localStorage
                  const examTypeLabel = examTypes.find(t => t.value === selectedType)?.label || selectedType;
                  const deliveryLabel = certificateDelivery === "office" ? "Abholen im Büro" : "Per Post";
                  
                  const cartData = {
                    examItem: {
                      id: "exam-" + Date.now(),
                      name: "telc B2 Prüfung (allgemein)",
                      examDate: selectedDate,
                      examType: examTypeLabel,
                      certificateDelivery: deliveryLabel,
                      price: 179.00,
                    },
                    includePostal: certificateDelivery === "post"
                  };
                  
                  localStorage.setItem("cartData", JSON.stringify(cartData));
                  navigate("/warenkorb");
                  window.scrollTo(0, 0);
                }}
              >
                In den Warenkorb
              </Button>
              
              {!isFormValid && (
                <p className="text-red-500 text-sm text-center">
                  Bitte füllen Sie alle erforderlichen Felder aus
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
