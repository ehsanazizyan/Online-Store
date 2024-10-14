import Navbar from "@/Navbar";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
    const router = useRouter();
    const { asPath } = router;

    return (
        <div
            className={
                asPath === "/products" ? "overflow-hidden h-screen" : "overflow-auto h-screen "
            }>
            <div className="sticky z-50 mb-4">
                <Navbar />
            </div>
            {children}
        </div>
    );
};
export default Layout;
