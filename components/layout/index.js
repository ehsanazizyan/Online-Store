import Navbar from "@/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const router = useRouter();
    const { asPath } = router;

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
        <div
            className={
                asPath === "/products" ? "overflow-hidden h-screen" : "overflow-auto h-screen"
            }>
            <div className={`top-0 z-50 w-full mb-4 ${isScrolled ? "fixed" : ""}`}>
                <Navbar />
            </div>
            {children}
        </div>
    );
};
export default Layout;
