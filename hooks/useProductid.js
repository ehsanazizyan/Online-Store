import { useQuery } from "@tanstack/react-query";

const fetchProductById = async (id) => {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
};

export const useProductId = (productId) => {
    return useQuery({
        queryKey: [`product-${productId}`],
        queryFn: () => fetchProductById(productId),
        staleTime: 60000, // 1 minute
        cacheTime: 120000, // 2 minute
    });
};
