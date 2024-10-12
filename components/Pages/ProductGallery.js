import Loader from "@/Loader";
import ProductCard from "@/ProductCard";
import useSearchStore from "@/searchStore";
import { useProducts } from "@/useProducts";
import { CircleX, TriangleAlert } from "lucide-react";

import { useRef, useEffect, useCallback, useMemo } from "react";

const ProductGallery = () => {
    const { fetchNextPage, data, hasNextPage, isFetchingNextPage, isLoading, isError } =
        useProducts();

    const galleryRef = useRef(null);
    const products = data ? data.pages.flatMap((item) => item.products) : [];

    const { products: searchedProducts, message } = useSearchStore();

    const finalProductList = searchedProducts.length > 0 ? searchedProducts : products;

    const handleScroll = useCallback(() => {
        const { scrollTop, scrollHeight, clientHeight } = galleryRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 5 && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    useEffect(() => {
        const galleryElement = galleryRef.current;
        if (galleryElement) {
            galleryElement.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (galleryElement) {
                galleryElement.removeEventListener("scroll", handleScroll);
            }
        };
    }, [handleScroll]);

    if (isError)
        return (
            <div className=" flex justify-center items-center h-screen">
                <div className="bg-error px-10 rounded-md flex items-center justify-center text-white gap-2">
                    <span className="flex items-center gap-3 justify-center py-10">
                        There was an issue loading this page
                    </span>
                </div>
            </div>
        );

    if (isLoading) return <Loader label="Loading Products" size="md" />;

    if (message.type) {
        return (
            <div className="flex justify-center items-center h-screen w-full">
                <div
                    role="alert"
                    className={`${
                        message.type === "error" ? "alert-error" : "alert-warning"
                    } alert w-fit`}>
                    {message.type === "error" ? <CircleX /> : <TriangleAlert />}

                    <span> {message.message} </span>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full overflow-y-scroll" ref={galleryRef}>
            <div className="flex flex-col pb-16">
                <div className="flex flex-wrap items-center gap-4 justify-center">
                    {finalProductList?.map((item, index) => (
                        <div key={index}>
                            <ProductCard {...item} />
                        </div>
                    ))}
                </div>
                {isFetchingNextPage && <Loader label="Loading More" />}
            </div>
        </div>
    );
};

export default ProductGallery;
