import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const fetchProducts = async (skipCount = 10) => {
    const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${skipCount}`);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const res = await response.json();

    return res;
};

export const useProducts = () => {
    return useInfiniteQuery({
        queryKey: ["products"],
        queryFn: ({ skipCount }) => fetchProducts(skipCount),

        getNextPageParam: (lastPage, allProduct) => {
            const { skip, limit, total } = lastPage;
            if (skip + limit < total) {
                return skip + limit;
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
