import Navbar from "@/Navbar";
import ProductGallery from "@/Pages/ProductGallery";
import { useEffect, useState } from "react";

const Products = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop } = document.documentElement;
            setIsScrolled(scrollTop > 0);
        };

        if (typeof window !== "undefined") {
            window.addEventListener("scroll", handleScroll);
            handleScroll();
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <>
            <div className={`top-0 z-50 w-full mb-4 ${isScrolled ? "fixed" : ""}`}>
                <Navbar />
            </div>

            <ProductGallery />
        </>
    );
};

export default Products;
