import { useQuery } from "@tanstack/react-query";

const fetchSearch = async (search) => {
    try {
        const response = await fetch(`https://dummyjson.com/products/search?q=${search}`);
        if (!response.ok) throw new Error("Failed to fetch data");
        return response.json();
    } catch (error) {
        throw new Error(error.message);
    }
};

export const useSearch = (search) => {
    return useQuery({
        queryKey: ["search", search],
        queryFn: () => fetchSearch(search),
        staleTime: 60000, // 1 minute
        cacheTime: 120000, // 2 minutes
        enabled: !!search, // Only run if `search` is not empty or null
    });
};
