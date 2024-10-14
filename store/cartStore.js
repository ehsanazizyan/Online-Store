import { create } from "zustand";
import { persist } from "zustand/middleware";

export const cartStore = create(
    persist(
        (set) => ({
            selectedItems: [],
            totalItems: 0,
            totalPrice: 0,

            addCartItem: (product) =>
                set((state) => {
                    // Check if the item is already added or not
                    if (!state.selectedItems.find((item) => item.id === product.id)) {
                        const updatedItems = [...state.selectedItems, { ...product, quantity: 1 }];
                        return {
                            selectedItems: updatedItems,
                            totalItems: state.totalItems + 1,
                            totalPrice: state.totalPrice + product.price,
                        };
                    }
                    return state; // If no changes should be made, return the current state
                }),

            removeItems: (id) =>
                set((state) => {
                    const itemToRemove = state.selectedItems.find((item) => item.id === id);
                    const updatedItems = state.selectedItems.filter((item) => item.id !== id);

                    return {
                        selectedItems: updatedItems,
                        totalItems: state.totalItems - itemToRemove.quantity,
                        totalPrice: state.totalPrice - itemToRemove.quantity * itemToRemove.price,
                    };
                }),

            incrementItem: (id) =>
                set((state) => {
                    const index = state.selectedItems.findIndex((item) => item.id === id);
                    state.selectedItems[index].quantity++;

                    const updateTotal = state.selectedItems.reduce(
                        (acc, cur) => acc + cur.quantity,
                        0
                    );
                    const updateTotalPrice = state.selectedItems.reduce(
                        (acc, cur) => acc + cur.quantity * cur.price,
                        0
                    );

                    return {
                        ...state,
                        totalItems: updateTotal,
                        totalPrice: updateTotalPrice,
                    };
                }),

            decrementItem: (id) =>
                set((state) => {
                    const index = state.selectedItems.findIndex((item) => item.id === id);

                    if (state.selectedItems[index].quantity > 1) {
                        state.selectedItems[index].quantity--;
                    } else {
                        return state;
                    }

                    const updateTotal = state.selectedItems.reduce(
                        (acc, cur) => acc + cur.quantity,
                        0
                    );
                    const updateTotalPrice = state.selectedItems.reduce(
                        (acc, cur) => acc + cur.quantity * cur.price,
                        0
                    );

                    return {
                        ...state,
                        totalItems: updateTotal,
                        totalPrice: updateTotalPrice,
                    };
                }),
            clearCart: () =>
                set(() => ({
                    selectedItems: [],
                    totalItems: 0,
                    totalPrice: 0,
                })),
        }),
        {
            name: "cart-storage",
        }
    )
);
