/**
 * CartItem Component
 * Displays a single cart item
 */

import { Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from '@/services/cart/cart.types';

interface CartItemProps {
  item: CartItemType & { image?: string };
  onRemove: (id: string) => void;
  variant?: 'table' | 'card';
}

export function CartItem({ item, onRemove, variant = 'table' }: CartItemProps) {
  if (variant === 'card') {
    return (
      <div className="bg-card border border-border rounded-md p-4">
        <div className="flex gap-4">
          {item.image && (
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded flex-shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start gap-2 mb-2">
              <p className="font-semibold text-primary">{item.name}</p>
              <button
                onClick={() => onRemove(item.id)}
                className="text-red-600 hover:text-red-700 flex-shrink-0"
                aria-label="Artikel entfernen"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              {item.examDate && (
                <p>Prüfungstermin: {item.examDate}</p>
              )}
              {item.examType && (
                <p>Prüfungsart: {item.examType}</p>
              )}
              {item.certificateDelivery && (
                <p>Zertifikat/Ergebnis: {item.certificateDelivery}</p>
              )}
            </div>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-sm">Anzahl: 1</span>
              <span className="font-semibold">{item.price.toFixed(2)} €</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <tr>
      <td className="border border-border p-4 text-center">
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-600 hover:text-red-700"
          aria-label="Artikel entfernen"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </td>
      <td className="border border-border p-4">
        {item.image && (
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 object-cover rounded"
          />
        )}
      </td>
      <td className="border border-border p-4">
        <div className="space-y-1">
          <p className="font-semibold text-primary hover:underline cursor-pointer">
            {item.name}
          </p>
          {item.examDate && (
            <p className="text-sm text-muted-foreground">
              Prüfungstermin auswählen: {item.examDate}
            </p>
          )}
          {item.examType && (
            <p className="text-sm text-muted-foreground">
              Prüfungsart auswählen: {item.examType}
            </p>
          )}
          {item.certificateDelivery && (
            <p className="text-sm text-muted-foreground">
              Zertifikat/Ergebnis: {item.certificateDelivery}
            </p>
          )}
        </div>
      </td>
      <td className="border border-border p-4">
        <span className="font-semibold">{item.price.toFixed(2)} €</span>
      </td>
      <td className="border border-border p-4 text-center">
        <span>1</span>
      </td>
      <td className="border border-border p-4">
        <span className="font-semibold">{item.price.toFixed(2)} €</span>
      </td>
    </tr>
  );
}
