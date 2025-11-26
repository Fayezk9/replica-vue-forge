/**
 * EmptyCart Component
 * Displays when cart has no items
 */

import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function EmptyCart() {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-md p-6 text-center">
      <p className="text-muted-foreground">Dein Warenkorb ist gegenwärtig leer.</p>
      <Button onClick={() => navigate('/telc-b1')} className="mt-4">
        Zurück zum Shop
      </Button>
    </div>
  );
}
