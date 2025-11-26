/**
 * useCart Hook
 * Provides cart state and operations
 */

import { useState, useEffect, useCallback } from 'react';
import { CartService } from '@/services/cart/cart.service';
import type { Cart, AddCartItemParams, CartItem } from '@/services/cart/cart.types';

export function useCart() {
  const [cart, setCart] = useState<Cart>(() => CartService.getCart());
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Refresh cart from storage
   */
  const refreshCart = useCallback(() => {
    const updatedCart = CartService.getCart();
    setCart(updatedCart);
  }, []);

  /**
   * Add item to cart
   */
  const addItem = useCallback(async (params: AddCartItemParams) => {
    setIsLoading(true);
    try {
      const updatedCart = CartService.addItem(params);
      setCart(updatedCart);
      return { success: true, error: null };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Failed to add item'),
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Remove item from cart
   */
  const removeItem = useCallback(async (itemId: string) => {
    setIsLoading(true);
    try {
      const updatedCart = CartService.removeItem(itemId);
      setCart(updatedCart);
      return { success: true, error: null };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Failed to remove item'),
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Clear cart
   */
  const clearCart = useCallback(async () => {
    setIsLoading(true);
    try {
      const updatedCart = CartService.clearCart();
      setCart(updatedCart);
      return { success: true, error: null };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Failed to clear cart'),
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Update cart item
   */
  const updateItem = useCallback(
    async (itemId: string, updates: Partial<CartItem>) => {
      setIsLoading(true);
      try {
        const updatedCart = CartService.updateItem(itemId, updates);
        setCart(updatedCart);
        return { success: true, error: null };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error : new Error('Failed to update item'),
        };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /**
   * Get cart item by ID
   */
  const getItem = useCallback((itemId: string) => {
    return CartService.getItem(itemId);
  }, []);

  // Listen to storage events for cross-tab sync
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cartData') {
        refreshCart();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [refreshCart]);

  return {
    // State
    items: cart.items,
    totalItems: cart.totalItems,
    totalPrice: cart.totalPrice,
    isEmpty: cart.items.length === 0,
    isLoading,

    // Actions
    addItem,
    removeItem,
    updateItem,
    clearCart,
    getItem,
    refreshCart,
  };
}
