import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CartItem {
  id: string;
  name: string;
  examDate: string;
  examType: string;
  certificateDelivery: string;
  price: number;
}

const checkoutSchema = z.object({
  gender: z.enum(["Herr", "Frau", "Divers"], { required_error: "Anrede ist erforderlich" }),
  firstName: z.string().min(1, "Vorname ist erforderlich").max(100),
  lastName: z.string().min(1, "Nachname ist erforderlich").max(100),
  street: z.string().min(1, "Straße ist erforderlich").max(200),
  houseNumber: z.string().min(1, "Hausnummer ist erforderlich").max(20),
  postcode: z.string().min(1, "Postleitzahl ist erforderlich").max(10),
  city: z.string().min(1, "Stadt ist erforderlich").max(100),
  phone: z.string().min(1, "Telefon ist erforderlich").max(30),
  email: z.string().email("Ungültige E-Mail-Adresse").max(255),
  birthDate: z.date({ required_error: "Geburtsdatum ist erforderlich" }),
  birthPlace: z.string().min(1, "Geburtsort ist erforderlich").max(100),
  birthCountry: z.string().min(1, "Geburtsland ist erforderlich").max(100),
  motherTongue: z.string().max(100).optional(),
  orderNotes: z.string().max(1000).optional(),
});

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({
    gender: "",
    firstName: "",
    lastName: "",
    street: "",
    houseNumber: "",
    postcode: "",
    city: "",
    phone: "",
    email: "",
    birthDate: undefined as Date | undefined,
    birthPlace: "",
    birthCountry: "",
    motherTongue: "",
    orderNotes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const savedCart = localStorage.getItem("cartData");
    if (savedCart) {
      const cartData = JSON.parse(savedCart);
      const items: CartItem[] = [cartData.examItem];
      
      if (cartData.includePostal) {
        items.push({
          id: "postal-" + Date.now(),
          name: "Per Post",
          examDate: "",
          examType: "",
          certificateDelivery: "",
          price: 8.00,
        });
      }
      
      setCartItems(items);
    } else {
      navigate("/warenkorb");
    }
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData(prev => ({ ...prev, birthDate: date }));
    if (errors.birthDate) {
      setErrors(prev => ({ ...prev, birthDate: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      checkoutSchema.parse(formData);
      
      toast({
        title: "Bestellung aufgegeben",
        description: "Vielen Dank für Ihre Bestellung!",
      });
      
      localStorage.removeItem("cartData");
      navigate("/");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
        toast({
          title: "Fehler",
          description: "Bitte füllen Sie alle erforderlichen Felder aus.",
          variant: "destructive",
        });
      }
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const total = subtotal;

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />
      <main className="py-6 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8">Kasse</h1>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-8">
                {/* Billing Details */}
                <div>
                  <h2 className="font-serif text-xl md:text-2xl font-bold mb-4 md:mb-6">Rechnungsdetails</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="gender">Anrede <span className="text-red-600">*</span></Label>
                      <Select
                        value={formData.gender}
                        onValueChange={(value) => handleSelectChange("gender", value)}
                      >
                        <SelectTrigger className={errors.gender ? "border-red-500" : ""}>
                          <SelectValue placeholder="Bitte wählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Herr">Herr</SelectItem>
                          <SelectItem value="Frau">Frau</SelectItem>
                          <SelectItem value="Divers">Divers</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.gender && <p className="text-red-600 text-sm mt-1">{errors.gender}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Vorname <span className="text-red-600">*</span></Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={errors.firstName ? "border-red-500" : ""}
                        />
                        {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}
                      </div>
                      
                      <div>
                        <Label htmlFor="lastName">Nachname <span className="text-red-600">*</span></Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={errors.lastName ? "border-red-500" : ""}
                        />
                        {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="street">Straße <span className="text-red-600">*</span></Label>
                        <Input
                          id="street"
                          name="street"
                          value={formData.street}
                          onChange={handleInputChange}
                          className={errors.street ? "border-red-500" : ""}
                        />
                        {errors.street && <p className="text-red-600 text-sm mt-1">{errors.street}</p>}
                      </div>
                      
                      <div>
                        <Label htmlFor="houseNumber">Hausnummer <span className="text-red-600">*</span></Label>
                        <Input
                          id="houseNumber"
                          name="houseNumber"
                          value={formData.houseNumber}
                          onChange={handleInputChange}
                          className={errors.houseNumber ? "border-red-500" : ""}
                        />
                        {errors.houseNumber && <p className="text-red-600 text-sm mt-1">{errors.houseNumber}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="postcode">Postleitzahl <span className="text-red-600">*</span></Label>
                        <Input
                          id="postcode"
                          name="postcode"
                          value={formData.postcode}
                          onChange={handleInputChange}
                          className={errors.postcode ? "border-red-500" : ""}
                        />
                        {errors.postcode && <p className="text-red-600 text-sm mt-1">{errors.postcode}</p>}
                      </div>
                      
                      <div>
                        <Label htmlFor="city">Stadt <span className="text-red-600">*</span></Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className={errors.city ? "border-red-500" : ""}
                        />
                        {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">Telefon <span className="text-red-600">*</span></Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <Label htmlFor="email">E-Mail-Adresse <span className="text-red-600">*</span></Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>
                </div>

                {/* Birth Information */}
                <div>
                  <h2 className="font-serif text-xl md:text-2xl font-bold mb-4 md:mb-6">Geburtsinformationen</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="birthDate">Geburtsdatum <span className="text-red-600">*</span></Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formData.birthDate && "text-muted-foreground",
                              errors.birthDate && "border-red-500"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.birthDate ? (
                              format(formData.birthDate, "dd.MM.yyyy", { locale: de })
                            ) : (
                              <span>01.01.1990</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={formData.birthDate}
                            onSelect={handleDateChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.birthDate && <p className="text-red-600 text-sm mt-1">{errors.birthDate}</p>}
                    </div>

                    <div>
                      <Label htmlFor="birthPlace">Geburtsort (Die Stadt, wo Sie geboren sind) <span className="text-red-600">*</span></Label>
                      <Input
                        id="birthPlace"
                        name="birthPlace"
                        value={formData.birthPlace}
                        onChange={handleInputChange}
                        placeholder="z.B Berlin"
                        className={errors.birthPlace ? "border-red-500" : ""}
                      />
                      {errors.birthPlace && <p className="text-red-600 text-sm mt-1">{errors.birthPlace}</p>}
                    </div>

                    <div>
                      <Label htmlFor="birthCountry">Geburtsland (Das Land, wo Sie geboren sind) <span className="text-red-600">*</span></Label>
                      <Input
                        id="birthCountry"
                        name="birthCountry"
                        value={formData.birthCountry}
                        onChange={handleInputChange}
                        placeholder="Deutschland"
                        className={errors.birthCountry ? "border-red-500" : ""}
                      />
                      {errors.birthCountry && <p className="text-red-600 text-sm mt-1">{errors.birthCountry}</p>}
                    </div>

                    <div>
                      <Label htmlFor="motherTongue">Muttersprache (optional)</Label>
                      <Input
                        id="motherTongue"
                        name="motherTongue"
                        value={formData.motherTongue}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Order Notes */}
                <div>
                  <h2 className="font-serif text-xl md:text-2xl font-bold mb-4 md:mb-6">Zusätzliche Informationen</h2>
                  
                  <div>
                    <Label htmlFor="orderNotes">Bestellnotizen (optional)</Label>
                    <Textarea
                      id="orderNotes"
                      name="orderNotes"
                      value={formData.orderNotes}
                      onChange={handleInputChange}
                      placeholder="Anmerkungen zu deiner Bestellung, z.B. besondere Hinweise für die Lieferung."
                      rows={4}
                    />
                  </div>
                </div>

                {/* Order Summary */}
                <div>
                  <h2 className="font-serif text-xl md:text-2xl font-bold mb-4 md:mb-6">Deine Bestellung</h2>
                  
                  <div className="border border-border rounded-lg overflow-hidden">
                    <div className="bg-muted/50 p-4 border-b border-border">
                      <div className="flex justify-between font-semibold">
                        <span>Produkt</span>
                        <span>Zwischensumme</span>
                      </div>
                    </div>
                    
                    <div className="divide-y divide-border">
                      {cartItems.map((item) => (
                        <div key={item.id} className="p-4">
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                              <p className="font-medium">{item.name}</p>
                              {item.examDate && (
                                <p className="text-sm text-muted-foreground mt-1">
                                  Prüfungstermin: {item.examDate}
                                </p>
                              )}
                              {item.examType && (
                                <p className="text-sm text-muted-foreground">
                                  Prüfungsart: {item.examType}
                                </p>
                              )}
                              {item.certificateDelivery && (
                                <p className="text-sm text-muted-foreground">
                                  Zertifikat/Ergebnis: {item.certificateDelivery}
                                </p>
                              )}
                            </div>
                            <span className="font-semibold whitespace-nowrap">{item.price.toFixed(2)} €</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-muted/30 p-4 border-t border-border">
                      <div className="flex justify-between font-semibold">
                        <span>Zwischensumme</span>
                        <span>{subtotal.toFixed(2)} €</span>
                      </div>
                    </div>

                    <div className="bg-muted/50 p-4 border-t border-border">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Gesamtsumme</span>
                        <span>{total.toFixed(2)} €</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Deine persönlichen Daten werden verwendet, um deine Bestellung zu bearbeiten, 
                      deine Erfahrung auf dieser Website zu verbessern und für weitere Zwecke, 
                      die in unserer Datenschutzerklärung beschrieben sind.
                    </p>
                  </div>

                  <Button 
                    type="submit"
                    className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-base md:text-lg py-5 md:py-6"
                  >
                    Zahlungspflichtig bestellen
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
