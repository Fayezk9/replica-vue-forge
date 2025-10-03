import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import telcExamStudent from "@/assets/telc-exam-student.jpg";

interface CartItem {
  id: string;
  name: string;
  examDate: string;
  examType: string;
  certificateDelivery: string;
  price: number;
  image: string;
}

const Cart = () => {
  const navigate = useNavigate();
  
  // Sample cart data - in a real app, this would come from state management
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "telc B1 Prüfung (allgemein)",
      examDate: "25.10.2025",
      examType: "Gesamtprüfung",
      certificateDelivery: "Abholen im Büro",
      price: 179.00,
      image: telcExamStudent
    }
  ]);

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const total = subtotal;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <TopBar />
        <Header />
        <main className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">Warenkorb</h1>
              <div className="bg-blue-50 border border-blue-200 rounded-md p-6 text-center">
                <p className="text-muted-foreground">Dein Warenkorb ist gegenwärtig leer.</p>
                <Button 
                  onClick={() => navigate("/telc-b1")}
                  className="mt-4"
                >
                  Zurück zum Shop
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />
      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">Warenkorb</h1>
            
            {/* Cart Table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="border border-border p-4 text-left w-16"></th>
                    <th className="border border-border p-4 text-left w-24"></th>
                    <th className="border border-border p-4 text-left">Produkt</th>
                    <th className="border border-border p-4 text-left w-32">Preis</th>
                    <th className="border border-border p-4 text-left w-32">Anzahl</th>
                    <th className="border border-border p-4 text-left w-32">Zwischensumme</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td className="border border-border p-4 text-center">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700"
                          aria-label="Artikel entfernen"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                      <td className="border border-border p-4">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="border border-border p-4">
                        <div className="space-y-1">
                          <p className="font-semibold text-primary hover:underline cursor-pointer">
                            {item.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Prüfungstermin auswählen: {item.examDate}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Prüfungsart auswählen: {item.examType}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Zertifikat/Ergebnis: {item.certificateDelivery}
                          </p>
                        </div>
                      </td>
                      <td className="border border-border p-4">
                        <span className="font-semibold">{item.price.toFixed(2)} €</span>
                      </td>
                      <td className="border border-border p-4">
                        <span className="text-muted-foreground">1</span>
                      </td>
                      <td className="border border-border p-4">
                        <span className="font-semibold">{item.price.toFixed(2)} €</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Update Cart Button */}
            <div className="mb-12">
              <Button variant="secondary" disabled>
                Warenkorb aktualisieren
              </Button>
            </div>

            {/* Cart Summary */}
            <div className="flex justify-end">
              <div className="w-full md:w-2/5">
                <h2 className="font-serif text-2xl font-bold mb-6">Warenkorb-Summe</h2>
                
                <div className="border border-border">
                  <div className="flex justify-between p-4 border-b border-border">
                    <span className="font-semibold">Zwischensumme</span>
                    <span className="font-semibold">{subtotal.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between p-4">
                    <span className="font-bold">Gesamtsumme</span>
                    <span className="font-bold">{total.toFixed(2)} €</span>
                  </div>
                </div>

                <Button 
                  className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-lg py-6"
                  onClick={() => navigate("/checkout")}
                >
                  Weiter zur Kasse
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
