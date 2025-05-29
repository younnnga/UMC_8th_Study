import type { CartItems } from '../types/cart';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer'
import cartItems from '../constants/cartitems';
import { useShallow } from 'zustand/shallow';

interface CartActions {
  increase: (id:string) => void;
  decrease: (id:string) => void;
  removeItem: (id:string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
  openModal: () => void;
  closeModal: () => void;
}

interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;
  isModalOpen: boolean;
  actions: CartActions;
}

export const useCartStore = create<CartState>()(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  immer((set,_) => ({
    cartItems: cartItems,
    amount: 0,
    total: 0,
    isModalOpen: false,
    actions: {
      increase: (id:string) => {
        set((state) => {
          const cartItem = state.cartItems.find((item) => item.id ===
          id);

          if (cartItem) {
            cartItem.amount += 1;
          }
        });
      },
      decrease: (id:string) => {
        set((state) => {
          const cartItem = state.cartItems.find((item)=> item.id ===
          id);

          if(cartItem && cartItem.amount > 0) {
            cartItem.amount -= 1;
          }
        });
      },
      removeItem: (id:string) => {
        set((state) => {
          state.cartItems = state.cartItems.filter((item)=> item.id
          !== id);
        });
      },
      clearCart: () => {
        set((state) => {
          state.cartItems = [];
        });
      },
      calculateTotals: () => {
        set((state) => {
          let amount = 0;
          let total = 0;
          state.cartItems.forEach((item)=>{
            amount += item.amount;
            total += item.amount * item.price;
          });

          state.amount = amount;
          state.total = total;
        });
      },
      openModal: () => {
        set((state) => {
          state.isModalOpen = true;
        });
      },
      closeModal: () => {
        set((state) => {
          state.isModalOpen = false;
        });
      },
    },
  }))
);

export const useCartInfo = () => 
  useCartStore(
    useShallow((state)=>({
      cartItems: state.cartItems,
      amount: state.amount,
      total: state.total,
      isModalOpen: state.isModalOpen, 
    }))
  );

export const useCartActions = () => useCartStore((state) => state.actions);