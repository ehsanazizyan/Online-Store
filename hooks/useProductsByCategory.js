import { useQuery } from "@tanstack/react-query";

const fetchProductsByCategory = async (category) => {
    const response = await fetch(`https://dummyjson.com/products/category/${category}`);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    return response.json();
};

export const useProductsByCategory = (category) => {
    return useQuery({
        queryKey: ["productsCategory"],
        queryFn: () => fetchProductsByCategory(category),
        staleTime: 60000, // 1 minute
        cacheTime: 120000, // 2 minute
    });
};
