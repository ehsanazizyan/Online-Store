import Loader from "@/Loader";
import ProductDetails from "@/ProductDetails";
import { useProductId } from "@/useProductId";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ProductId = () => {
    const router = useRouter();
    const { isReady } = router;
    const id = router.query.productId;

    const { data, isLoading, isError } = useProductId(isReady ? id : "");

    useEffect(() => {
        let timeout;
        if (isError) {
            timeout = setTimeout(() => {
                router.replace("/products");
            }, 5000);
        }
        return () => clearTimeout(timeout);

        // clearTimeout is used here to avoid potential issues if the component unmounts
        // before the timeout completes. It ensures that the timer is cancelled if the
        // user navigates away or the component is unmounted, preventing unwanted redirects
    }, [isError, router]);

    if (isError) {
        return (
            <div className=" flex justify-center items-center h-screen">
                <div className="bg-error px-10 rounded-md flex items-center justify-center text-white gap-2">
                    <Loader size="md" label="Something went wrong. Redirecting to products" />
                </div>
            </div>
        );
    }

    if (isLoading)
        return (
            <div className=" flex justify-center items-center h-screen">
                <div className="bg-success px-10 rounded-md flex items-center justify-center text-white gap-2">
                    <Loader label="Loading Product Details" />
                </div>
            </div>
        );

    return (
        <div className="p-3 md:p-10">
            <ProductDetails product={data} />
        </div>
    );
};
export default ProductId;
