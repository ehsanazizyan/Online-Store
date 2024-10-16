import { cartStore } from "@/cartStore";

import CategoryList from "@/Pages/CategoryList";
import useSearchStore from "@/searchStore";
import { useSearch } from "@/useSearch";
import { ChartBarStacked, House, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

const Navbar = () => {
    const router = useRouter();
    const { asPath } = router;

    const [search, setSearch] = useState("");
    const [openSearchInput, setOpenSearchInput] = useState(false);
    const debouncedSearch = useDebounce(search, 500);

    const { totalItems, totalPrice } = cartStore();
    //_________________________________________
    // Conditionally triggering the search request based on the debounced input and the current path:
    // 1. If `debouncedSearch` has a value and we are on the `/products` page (`asPath === "/products"`),
    //    the search query will be sent to fetch the search results.
    // 2. This prevents unnecessary requests to the server when typing in other routes,
    //    ensuring that the search functionality is only active on the products page.
    // 3. Additionally, debounce (with a 1-second delay) is used to avoid making server requests
    //    on every keystroke, only sending the request when the user pauses typing.
    const {
        data: searchResults,
        isError,
        isLoading,
    } = useSearch(debouncedSearch && asPath === "/products" ? debouncedSearch : "");
    //_________________________________________

    const { setProducts, setMessage, setSearchStore } = useSearchStore();
    useEffect(() => {
        if (debouncedSearch) {
            setSearchStore(search);
            if (searchResults?.products?.length > 0) {
                setProducts(searchResults.products);
                setMessage("");
            } else if (searchResults?.products?.length === 0) {
                setMessage({
                    type: "warning",
                    message: "No products were found with this search",
                });
            }
        } else {
            setMessage("");
            setProducts([]);
            setSearchStore(search);
        }

        if (isError) {
            setMessage({
                type: "error",
                message:
                    "An error occurred while fetching the data. Please try again later or check your internet connection",
            });
        }
    }, [searchResults, debouncedSearch]);

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link href="/products" className="btn btn-ghost text-base md:text-xl ">
                    <button className="tooltip tooltip-right tooltip-primary" data-tip="Go to Home">
                        <House className="size-5 md:size-6" />
                    </button>
                </Link>
            </div>
            <>
                <div
                    className={`flex items-center gap-1  ${
                        asPath === "/cart" ? "hidden" : "block"
                    }`}>
                    {isLoading && <span className="loading loading-spinner text-primary"></span>}
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder="Search"
                        className={`w-full h-9 md:h-12 md:w-60 input input-bordered transition-opacity duration-700 ${
                            openSearchInput ? "opacity-100 visible" : "opacity-0 invisible"
                        } `}
                    />
                    <Search
                        onClick={() => setOpenSearchInput(!openSearchInput)}
                        className="size-5 cursor-pointer md:size-6"
                    />
                </div>

                <div className={`z-50 md:hidden ${asPath === "/products" ? "block" : "hidden"}`}>
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <details>
                                <summary>
                                    <ChartBarStacked className="size-5 cursor-pointer " />
                                </summary>
                                <ul className="overflow-y-scroll h-screen">
                                    <li>
                                        <CategoryList isMobileView={true} />
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 md:h-6 md:w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            <span className="badge badge-sm md:badge-md indicator-item text-primary">
                                {totalItems}
                            </span>
                        </div>
                    </div>
                    <div
                        tabIndex={0}
                        className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                        <div className="card-body">
                            <span className="text-lg font-bold">{totalItems} Items</span>
                            <span className="text-primary font-semibold">
                                Subtotal: ${totalPrice}
                            </span>
                            <div className="card-actions">
                                <Link href="/cart" className="btn btn-primary btn-block">
                                    View cart
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
};
export default Navbar;
