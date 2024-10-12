import { create } from "zustand";

const useSearchStore = create((set) => ({
    products: [],
    message: {},
    searchValue: "",

    setMessage: (message) => set({ message }),
    setProducts: (products) => set({ products }),
    setSearchStore: (value) => set({ searchValue: value }),
}));
export default useSearchStore;
