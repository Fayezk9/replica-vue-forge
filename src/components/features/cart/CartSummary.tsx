/**
 * CartSummary Component
 * Displays cart totals and checkout button
 */

import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface CartSummaryProps {
  subtotal: number;
  total: number;
}

export function CartSummary({ subtotal, total }: CartSummaryProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-card border border-border rounded-md p-6">
      <h2 className="font-serif text-xl font-bold mb-4">Warenkorbsumme</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center pb-3 border-b border-border">
          <span className="text-muted-foreground">Zwischensumme</span>
          <span className="font-semibold">{subtotal.toFixed(2)} €</span>
        </div>
        
        <div className="flex justify-between items-center pb-3 border-b border-border">
          <span className="font-semibold">Gesamt</span>
          <span className="font-bold text-lg text-primary">{total.toFixed(2)} €</span>
        </div>
      </div>

      <Button 
        onClick={() => navigate('/checkout')} 
        className="w-full"
        size="lg"
      >
        Zur Kasse
      </Button>
    </div>
  );
}
