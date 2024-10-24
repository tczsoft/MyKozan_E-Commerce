
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
    persist(
        (set, get) => ({
            cart: [],
            addToCart: (product) => {
                set((state) => {
                    const itemIndex = state.cart.findIndex(item => item._id === product._id);
                    if (itemIndex >= 0) {
                        const updatedCart = [...state.cart];
                        updatedCart[itemIndex].quantity += 1;
                        return { cart: updatedCart };
                    } else {
                        return { cart: [...state.cart, { ...product, quantity: 50 }] };
                    }
                });
            },
            removeFromCart: (productId) => {
                console.log("Removing product with ID:", productId);
                set((state) => {
                    const updatedCart = state.cart.filter((item) => item._id !== productId);
                    console.log("Updated cart (after remove):", updatedCart);
                    localStorage.setItem("mykozanCart", JSON.stringify(updatedCart)); 
                    return { cart: updatedCart };
                });
            },
            
            
            clearCart: () => set({ cart: [] }),
            updateQuantity: (productId, quantity) => {
                set((state) => {
                    const updatedCart = state.cart.map(item =>
                        item._id === productId ? { ...item, quantity } : item
                    );
                    console.log('Updated cart (zustand):', updatedCart);
                    localStorage.setItem('mykozanCart', JSON.stringify(updatedCart)); 
                    return { cart: updatedCart };
                });
            },
        }),
        {
            name: "mykozanCart", 
            getStorage: () => localStorage, 
        }
    )
);

export default useCartStore;
