import { useQuery } from "@tanstack/react-query";

const fetchCategoryProducts = async (category) => {
    const response = await fetch(`https://dummyjson.com/products/category/${category}`);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    return response.json();
};

export const useCategoryProducts = (category) => {
    return useQuery({
        queryKey: ["products"],
        queryFn: () => fetchCategoryProducts(category),
        staleTime: 60000, // 1 minute
        cacheTime: 120000, // 2 minute
    });
};
