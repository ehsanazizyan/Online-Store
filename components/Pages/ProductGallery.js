import Loader from "@/Loader";
import ProductCard from "@/ProductCard";
import { useProducts } from "@/useProducts";

import { useEffect } from "react";

const ProductGallery = () => {
    const { fetchNextPage, data, hasNextPage, isFetchingNextPage, isLoading, isError } =
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

    if (!isError)
        return (
            <div className=" flex justify-center items-center h-screen">
                <div className="bg-error px-10 rounded-md flex items-center justify-center text-white gap-2">
                    <Loader label="There was an issue loading this page" size="md" />
                </div>
            </div>
        );

    if (isLoading) return <Loader label="Loading Products" size="md" />;

    return (
        <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-4 justify-center">
                {products?.map((item, index) => (
                    <div key={index}>
                        <ProductCard {...item} />
                    </div>
                ))}
            </div>
            {isFetchingNextPage && <Loader label="Loading More" />}
        </div>
    );
};

export default ProductGallery;
