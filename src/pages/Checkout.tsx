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
import { useState, useEffect, useRef, useCallback } from "react";
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

interface StreetSuggestion {
  name: string;
  postalCode: string;
  locality: string;
  borough?: string;
}

interface PostalCodeSuggestion {
  postalCode: string;
  name: string;
}

const checkoutSchema = z.object({
  gender: z.enum(["Herr", "Frau", "Divers"], { 
    errorMap: () => ({ message: "Bitte wählen" })
  }),
  firstName: z.string().min(1, "Vorname ist erforderlich").max(100),
  lastName: z.string().min(1, "Nachname ist erforderlich").max(100),
  street: z.string()
    .min(1, "Straße ist erforderlich")
    .max(200)
    .refine((val) => !/\d/.test(val), {
      message: "Bitte geben Sie nur den Straßennamen ein, keine Hausnummer"
    }),
  houseNumber: z.string().min(1, "Hausnummer ist erforderlich").max(20),
  postcode: z.string().min(1, "Postleitzahl ist erforderlich").max(10),
  city: z.string().min(1, "Stadt ist erforderlich").max(100),
  phone: z.string().min(1, "Telefon ist erforderlich").max(30),
  email: z.string().email("Ungültige E-Mail-Adresse").max(255),
  birthDate: z.date({ required_error: "Geburtsdatum ist erforderlich" }),
  birthPlace: z.string().min(1, "Geburtsort ist erforderlich").max(100),
  birthCountry: z.string().min(1, "Geburtsland ist erforderlich").max(100),
  motherTongue: z.string().min(1, "Muttersprache ist erforderlich").max(100),
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
    phoneCountryCode: "+49",
    email: "",
    birthDate: undefined as Date | undefined,
    birthPlace: "",
    birthCountry: "",
    motherTongue: "",
    orderNotes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [streetSuggestions, setStreetSuggestions] = useState<StreetSuggestion[]>([]);
  const [showStreetSuggestions, setShowStreetSuggestions] = useState(false);
  const [isLoadingStreets, setIsLoadingStreets] = useState(false);
  const [postalCodeSuggestions, setPostalCodeSuggestions] = useState<PostalCodeSuggestion[]>([]);
  const [showPostalCodeSuggestions, setShowPostalCodeSuggestions] = useState(false);
  const [isLoadingPostalCodes, setIsLoadingPostalCodes] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const postalDebounceTimerRef = useRef<NodeJS.Timeout | null>(null);

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

  const fetchStreetSuggestions = useCallback(async (query: string) => {
    if (query.length < 2) {
      setStreetSuggestions([]);
      return;
    }

    // Only search for streets if we have a postal code and city
    if (!formData.postcode || !formData.city) {
      setStreetSuggestions([]);
      return;
    }

    setIsLoadingStreets(true);
    try {
      const response = await fetch(
        `https://openplzapi.org/de/Streets?name=^${encodeURIComponent(query)}&postalCode=${encodeURIComponent(formData.postcode)}&locality=${encodeURIComponent(formData.city)}&pageSize=20`,
        {
          headers: {
            'Accept': 'application/json',
          }
        }
      );
      
      const data = await response.json();
      
      // Filter out duplicates based on street name + locality
      const uniqueStreets = new Map<string, StreetSuggestion>();
      data.forEach((street: StreetSuggestion) => {
        const key = `${street.name}-${street.locality}`;
        if (!uniqueStreets.has(key)) {
          uniqueStreets.set(key, street);
        }
      });
      
      setStreetSuggestions(Array.from(uniqueStreets.values()));
      setShowStreetSuggestions(true);
    } catch (error) {
      console.error("Error fetching street suggestions:", error);
      setStreetSuggestions([]);
    } finally {
      setIsLoadingStreets(false);
    }
  }, [formData.postcode, formData.city]);

  const handleStreetInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Remove any numbers from street input
    const cleanValue = value.replace(/\d/g, '');
    
    setFormData(prev => ({ ...prev, [name]: cleanValue }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      fetchStreetSuggestions(cleanValue);
    }, 300);
  };

  const handleSelectStreet = (suggestion: StreetSuggestion) => {
    setFormData(prev => ({
      ...prev,
      street: suggestion.name,
      city: suggestion.locality,
      postcode: suggestion.postalCode
    }));
    
    setShowStreetSuggestions(false);
    setStreetSuggestions([]);
    
    if (errors.street) setErrors(prev => ({ ...prev, street: "" }));
    if (errors.city) setErrors(prev => ({ ...prev, city: "" }));
    if (errors.postcode) setErrors(prev => ({ ...prev, postcode: "" }));
  };

  const fetchPostalCodeSuggestions = useCallback(async (query: string) => {
    if (query.length < 2) {
      setPostalCodeSuggestions([]);
      return;
    }

    setIsLoadingPostalCodes(true);
    try {
      const response = await fetch(
        `https://openplzapi.org/de/Localities?postalCode=${encodeURIComponent(query)}&pageSize=20`,
        {
          headers: {
            'Accept': 'application/json',
          }
        }
      );
      
      const data = await response.json();
      
      // Remove duplicates based on postal code + locality
      const uniquePostalCodes = new Map<string, PostalCodeSuggestion>();
      data.forEach((locality: { postalCode: string; name: string }) => {
        const key = `${locality.postalCode}-${locality.name}`;
        if (!uniquePostalCodes.has(key)) {
          uniquePostalCodes.set(key, {
            postalCode: locality.postalCode,
            name: locality.name
          });
        }
      });
      
      setPostalCodeSuggestions(Array.from(uniquePostalCodes.values()));
      setShowPostalCodeSuggestions(true);
    } catch (error) {
      console.error("Error fetching postal code suggestions:", error);
      setPostalCodeSuggestions([]);
    } finally {
      setIsLoadingPostalCodes(false);
    }
  }, []);

  const handlePostalCodeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }

    if (postalDebounceTimerRef.current) {
      clearTimeout(postalDebounceTimerRef.current);
    }

    postalDebounceTimerRef.current = setTimeout(() => {
      fetchPostalCodeSuggestions(value);
    }, 300);
  };

  const handleSelectPostalCode = (suggestion: PostalCodeSuggestion) => {
    setFormData(prev => ({
      ...prev,
      postcode: suggestion.postalCode,
      city: suggestion.name
    }));
    
    setShowPostalCodeSuggestions(false);
    setPostalCodeSuggestions([]);
    
    if (errors.postcode) setErrors(prev => ({ ...prev, postcode: "" }));
    if (errors.city) setErrors(prev => ({ ...prev, city: "" }));
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
        
        // Scroll to first error field
        const firstErrorField = error.errors[0]?.path[0] as string;
        if (firstErrorField) {
          // Use setTimeout to ensure the error state is set before scrolling
          setTimeout(() => {
            const element = document.getElementById(firstErrorField) || 
                          document.querySelector(`[name="${firstErrorField}"]`);
            if (element) {
              element.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
              });
              // Focus the field
              element.focus();
            }
          }, 100);
        }
        
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

  // Check if all required fields are filled
  const isFormValid = formData.gender !== "" &&
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    formData.street.trim() !== "" &&
    formData.houseNumber.trim() !== "" &&
    formData.postcode.trim() !== "" &&
    formData.city.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.birthDate !== undefined &&
    formData.birthPlace.trim() !== "" &&
    formData.birthCountry.trim() !== "" &&
    formData.motherTongue.trim() !== "";

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />
      <main className="py-6 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold">Kasse</h1>
              <Button 
                type="button"
                variant="outline"
                onClick={() => {
                  navigate("/warenkorb");
                  window.scrollTo(0, 0);
                }}
              >
                ← Zurück zum Warenkorb
              </Button>
            </div>
            
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
                          placeholder="Vorname eingeben..."
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
                          placeholder="Nachname eingeben..."
                          className={errors.lastName ? "border-red-500" : ""}
                        />
                        {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative">
                        <Label htmlFor="postcode">Postleitzahl <span className="text-red-600">*</span></Label>
                        <Input
                          id="postcode"
                          name="postcode"
                          value={formData.postcode}
                          onChange={handlePostalCodeInputChange}
                          onFocus={() => {
                            if (postalCodeSuggestions.length > 0) {
                              setShowPostalCodeSuggestions(true);
                            }
                          }}
                          placeholder="PLZ eingeben..."
                          className={errors.postcode ? "border-red-500" : ""}
                          autoComplete="off"
                        />
                        {errors.postcode && <p className="text-red-600 text-sm mt-1">{errors.postcode}</p>}
                        
                        {showPostalCodeSuggestions && postalCodeSuggestions.length > 0 && (
                          <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border-2 border-primary rounded-md shadow-lg max-h-[300px] overflow-auto">
                            {isLoadingPostalCodes ? (
                              <div className="p-4 text-sm text-muted-foreground">Laden...</div>
                            ) : (
                              <div>
                                {postalCodeSuggestions.map((suggestion, index) => (
                                  <div
                                    key={`${suggestion.postalCode}-${suggestion.name}-${index}`}
                                    onClick={() => handleSelectPostalCode(suggestion)}
                                    className="px-4 py-3 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors border-b border-border last:border-b-0"
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="font-semibold text-base">{suggestion.postalCode}</span>
                                      <span className="text-sm opacity-90">{suggestion.name}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="city">Stadt <span className="text-red-600">*</span></Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="z.B. Dortmund"
                          className={errors.city ? "border-red-500" : ""}
                        />
                        {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative">
                        <Label htmlFor="street">Straße <span className="text-red-600">*</span></Label>
                        <Input
                          id="street"
                          name="street"
                          value={formData.street}
                          onChange={handleStreetInputChange}
                          onFocus={() => {
                            if (streetSuggestions.length > 0) {
                              setShowStreetSuggestions(true);
                            }
                          }}
                          placeholder="Straßenname eingeben..."
                          className={errors.street ? "border-red-500" : ""}
                          autoComplete="off"
                        />
                        {errors.street && <p className="text-red-600 text-sm mt-1">{errors.street}</p>}
                        
                        {showStreetSuggestions && streetSuggestions.length > 0 && (
                          <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border-2 border-primary rounded-md shadow-lg max-h-[300px] overflow-auto">
                            {isLoadingStreets ? (
                              <div className="p-4 text-sm text-muted-foreground">Laden...</div>
                            ) : (
                              <div>
                                {streetSuggestions.map((suggestion, index) => (
                                  <div
                                    key={`${suggestion.name}-${suggestion.locality}-${index}`}
                                    onClick={() => handleSelectStreet(suggestion)}
                                    className="px-4 py-3 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors border-b border-border last:border-b-0"
                                  >
                                    <div className="flex flex-col">
                                      <span className="font-semibold text-base">{suggestion.name}</span>
                                      <span className="text-sm opacity-90 mt-1">
                                        {suggestion.postalCode} {suggestion.locality}
                                        {suggestion.borough && ` (${suggestion.borough})`}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="houseNumber">Hausnummer <span className="text-red-600">*</span></Label>
                        <Input
                          id="houseNumber"
                          name="houseNumber"
                          value={formData.houseNumber}
                          onChange={handleInputChange}
                          placeholder="z.B. 123"
                          className={errors.houseNumber ? "border-red-500" : ""}
                        />
                        {errors.houseNumber && <p className="text-red-600 text-sm mt-1">{errors.houseNumber}</p>}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">Telefon <span className="text-red-600">*</span></Label>
                      <div className="flex gap-2">
                        <Select
                          value={formData.phoneCountryCode}
                          onValueChange={(value) => handleSelectChange("phoneCountryCode", value)}
                        >
                          <SelectTrigger className="w-[130px] h-11">
                            <SelectValue className="text-base" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[300px]">
                            <SelectItem value="+49" className="py-3 cursor-pointer text-base">🇩🇪 +49</SelectItem>
                            <SelectItem value="+43" className="py-3 cursor-pointer text-base">🇦🇹 +43</SelectItem>
                            <SelectItem value="+41" className="py-3 cursor-pointer text-base">🇨🇭 +41</SelectItem>
                            <SelectItem value="+33" className="py-3 cursor-pointer text-base">🇫🇷 +33</SelectItem>
                            <SelectItem value="+44" className="py-3 cursor-pointer text-base">🇬🇧 +44</SelectItem>
                            <SelectItem value="+39" className="py-3 cursor-pointer text-base">🇮🇹 +39</SelectItem>
                            <SelectItem value="+34" className="py-3 cursor-pointer text-base">🇪🇸 +34</SelectItem>
                            <SelectItem value="+31" className="py-3 cursor-pointer text-base">🇳🇱 +31</SelectItem>
                            <SelectItem value="+32" className="py-3 cursor-pointer text-base">🇧🇪 +32</SelectItem>
                            <SelectItem value="+48" className="py-3 cursor-pointer text-base">🇵🇱 +48</SelectItem>
                            <SelectItem value="+90" className="py-3 cursor-pointer text-base">🇹🇷 +90</SelectItem>
                            <SelectItem value="+1" className="py-3 cursor-pointer text-base">🇺🇸 +1</SelectItem>
                            <SelectItem value="+7" className="py-3 cursor-pointer text-base">🇷🇺 +7</SelectItem>
                            <SelectItem value="+86" className="py-3 cursor-pointer text-base">🇨🇳 +86</SelectItem>
                            <SelectItem value="+91" className="py-3 cursor-pointer text-base">🇮🇳 +91</SelectItem>
                            <SelectItem value="+81" className="text-base py-3 cursor-pointer"><span className="text-base">🇯🇵 +81</span></SelectItem>
                            <SelectItem value="+82" className="text-base py-3 cursor-pointer"><span className="text-base">🇰🇷 +82</span></SelectItem>
                            <SelectItem value="+55" className="text-base py-3 cursor-pointer"><span className="text-base">🇧🇷 +55</span></SelectItem>
                            <SelectItem value="+52" className="text-base py-3 cursor-pointer"><span className="text-base">🇲🇽 +52</span></SelectItem>
                            <SelectItem value="+61" className="text-base py-3 cursor-pointer"><span className="text-base">🇦🇺 +61</span></SelectItem>
                            <SelectItem value="+64" className="text-base py-3 cursor-pointer"><span className="text-base">🇳🇿 +64</span></SelectItem>
                            <SelectItem value="+27" className="text-base py-3 cursor-pointer"><span className="text-base">🇿🇦 +27</span></SelectItem>
                            <SelectItem value="+20" className="text-base py-3 cursor-pointer"><span className="text-base">🇪🇬 +20</span></SelectItem>
                            <SelectItem value="+234" className="text-base py-3 cursor-pointer"><span className="text-base">🇳🇬 +234</span></SelectItem>
                            <SelectItem value="+971" className="text-base py-3 cursor-pointer"><span className="text-base">🇦🇪 +971</span></SelectItem>
                            <SelectItem value="+966" className="text-base py-3 cursor-pointer"><span className="text-base">🇸🇦 +966</span></SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="123 456789"
                          className={cn("flex-1 h-11 text-base", errors.phone ? "border-red-500" : "")}
                        />
                      </div>
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
                        placeholder="beispiel@email.de"
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
                      <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
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
                            onSelect={(date) => {
                              handleDateChange(date);
                              setCalendarOpen(false);
                            }}
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
                      <Label htmlFor="motherTongue">Muttersprache <span className="text-red-600">*</span></Label>
                      <Input
                        id="motherTongue"
                        name="motherTongue"
                        value={formData.motherTongue}
                        onChange={handleInputChange}
                        placeholder="z.B. Deutsch"
                        className={errors.motherTongue ? "border-red-500" : ""}
                      />
                      {errors.motherTongue && <p className="text-red-600 text-sm mt-1">{errors.motherTongue}</p>}
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
                      className={errors.orderNotes ? "border-red-500" : ""}
                    />
                    {errors.orderNotes && <p className="text-red-600 text-sm mt-1">{errors.orderNotes}</p>}
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

                  <div className="relative">
                    <Button 
                      type="submit"
                      disabled={!isFormValid}
                      className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-base md:text-lg py-5 md:py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Zahlungspflichtig bestellen
                    </Button>
                    {!isFormValid && (
                      <div
                        onClick={() => {
                          toast({
                            title: "Formular unvollständig",
                            description: "Bitte füllen Sie alle erforderlichen Felder aus, bevor Sie fortfahren.",
                            variant: "destructive",
                          });
                        }}
                        className="absolute inset-0 cursor-pointer"
                      />
                    )}
                  </div>
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
