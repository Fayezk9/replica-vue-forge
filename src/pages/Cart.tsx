import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />
      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">Warenkorb</h1>
            
            <Card>
              <CardContent className="p-8 text-center">
                <div className="flex flex-col items-center gap-4">
                  <ShoppingCart className="w-16 h-16 text-muted-foreground" />
                  <p className="text-lg text-muted-foreground">
                    Dein Warenkorb ist gegenwärtig leer.
                  </p>
                  <Button 
                    onClick={() => navigate("/telc-b1")}
                    className="mt-4"
                  >
                    Zurück zum Shop
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
