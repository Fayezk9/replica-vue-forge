/**
 * Cart Service
 * Handles all cart-related business logic and persistence
 */

import { STORAGE_KEYS } from '@/config/constants';
import { LocalStorageService } from '../storage/localStorage.service';
import type { CartItem, Cart, AddCartItemParams } from './cart.types';

export class CartService {
  /**
   * Get all cart items
   */
  static getCart(): Cart {
    const items = LocalStorageService.getItem<CartItem[]>(STORAGE_KEYS.CART_DATA) || [];
    return {
      items,
      totalItems: items.length,
      totalPrice: this.calculateTotal(items),
    };
  }

  /**
   * Add item to cart
   */
  static addItem(params: AddCartItemParams): Cart {
    const cart = this.getCart();
    const newItem: CartItem = {
      id: crypto.randomUUID(),
      ...params,
    };

    const updatedItems = [...cart.items, newItem];
    LocalStorageService.setItem(STORAGE_KEYS.CART_DATA, updatedItems);

    return {
      items: updatedItems,
      totalItems: updatedItems.length,
      totalPrice: this.calculateTotal(updatedItems),
    };
  }

  /**
   * Remove item from cart
   */
  static removeItem(itemId: string): Cart {
    const cart = this.getCart();
    const updatedItems = cart.items.filter((item) => item.id !== itemId);
    
    LocalStorageService.setItem(STORAGE_KEYS.CART_DATA, updatedItems);

    return {
      items: updatedItems,
      totalItems: updatedItems.length,
      totalPrice: this.calculateTotal(updatedItems),
    };
  }

  /**
   * Clear all items from cart
   */
  static clearCart(): Cart {
    LocalStorageService.removeItem(STORAGE_KEYS.CART_DATA);
    return {
      items: [],
      totalItems: 0,
      totalPrice: 0,
    };
  }

  /**
   * Update cart item
   */
  static updateItem(itemId: string, updates: Partial<CartItem>): Cart {
    const cart = this.getCart();
    const updatedItems = cart.items.map((item) =>
      item.id === itemId ? { ...item, ...updates } : item
    );

    LocalStorageService.setItem(STORAGE_KEYS.CART_DATA, updatedItems);

    return {
      items: updatedItems,
      totalItems: updatedItems.length,
      totalPrice: this.calculateTotal(updatedItems),
    };
  }

  /**
   * Check if cart is empty
   */
  static isEmpty(): boolean {
    const cart = this.getCart();
    return cart.items.length === 0;
  }

  /**
   * Get cart item count
   */
  static getItemCount(): number {
    const cart = this.getCart();
    return cart.items.length;
  }

  /**
   * Calculate total price
   */
  private static calculateTotal(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.price, 0);
  }

  /**
   * Get cart item by ID
   */
  static getItem(itemId: string): CartItem | null {
    const cart = this.getCart();
    return cart.items.find((item) => item.id === itemId) || null;
  }
}
