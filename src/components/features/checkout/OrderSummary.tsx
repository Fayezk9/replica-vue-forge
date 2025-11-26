/**
 * OrderSummary Component
 * Displays order items and total for checkout
 */

import type { CartItem } from '@/services/cart/cart.types';

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
}

export function OrderSummary({ items, total }: OrderSummaryProps) {
  return (
    <div className="bg-card border border-border rounded-md p-6">
      <h2 className="font-serif text-xl font-bold mb-4">Deine Bestellung</h2>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-start pb-4 border-b border-border last:border-0">
            <div className="flex-1">
              <p className="font-semibold">{item.name}</p>
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
                  Zertifikat: {item.certificateDelivery}
                </p>
              )}
            </div>
            <span className="font-semibold ml-4">{item.price.toFixed(2)} €</span>
          </div>
        ))}

        <div className="flex justify-between items-center pt-4 border-t-2 border-border">
          <span className="font-bold text-lg">Gesamt</span>
          <span className="font-bold text-xl text-primary">{total.toFixed(2)} €</span>
        </div>
      </div>
    </div>
  );
}
