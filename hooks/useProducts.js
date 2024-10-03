import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const fetchProducts = async (pageParam = 0) => {
    const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${pageParam}`);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const res = await response.json();

    return res;
};

export const useProducts = () => {
    return useInfiniteQuery({
        queryKey: ["products"],
        queryFn: ({ pageParam }) => fetchProducts(pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allProduct) => {
            const { skip, limit, total } = lastPage;
            if (skip + limit < total) {
                return skip + limit; // The value of pageParam is determined by what is specified and returned in getNextPageParam
            } else {
                return undefined;
            }
        },
        staleTime: 60000, // 1 minute
        cacheTime: 120000, // 2 minute
    });
    // return useQuery({
    //     queryKey: ["products"],
    //     queryFn: fetchProducts,
    //     staleTime: 60000, // 1 minute
    //     cacheTime: 120000, // 2 minute
    // });
};
