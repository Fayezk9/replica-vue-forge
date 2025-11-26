/**
 * Cart Type Definitions
 */

export interface CartItem {
  id: string;
  name: string;
  examDate: string;
  examType: string;
  certificateDelivery: string;
  price: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface AddCartItemParams {
  name: string;
  examDate: string;
  examType: string;
  certificateDelivery: string;
  price: number;
}

export type CartState = CartItem[];
