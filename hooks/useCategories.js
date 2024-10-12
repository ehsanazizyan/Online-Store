import { useQuery } from "@tanstack/react-query";

const fetchCategories = async () => {
    const response = await fetch("https://dummyjson.com/products/category-list");
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    return response.json();
};

export const useCategories = () => {
    return useQuery({
        queryKey: ["category-list"],
        queryFn: fetchCategories,
        staleTime: 60000, // 1 minute
        cacheTime: 120000, // 2 minute
    });
};
