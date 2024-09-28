import Loader from "@/Loader";
import ProductCard from "@/ProductCard";
import { useProducts } from "@/useProducts";

import { useEffect } from "react";

const ProductGallery = () => {
    const { fetchNextPage, data, hasNextPage, isFetchingNextPage, isLoading, ...result } =
        useProducts();

    const products = data ? data.pages.flatMap((item) => item.products) : [];

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

            if (
                scrollTop + clientHeight >= scrollHeight - 5 &&
                hasNextPage &&
                !isFetchingNextPage
            ) {
                fetchNextPage();
            }
        };

        if (typeof window !== "undefined") {
            window.addEventListener("scroll", handleScroll);
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    if (isLoading) return <Loader label="Loading Products" />;

    return (
        <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-4 justify-center">
                {products?.map((item, index) => (
                    <div key={index}>
                        <ProductCard {...item} />
                    </div>
                ))}
            </div>
            {isFetchingNextPage && <Loader label="Load More" spinner={false} />}
        </div>
    );
};

export default ProductGallery;
