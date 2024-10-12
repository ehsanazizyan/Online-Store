import Loader from "@/Loader";
import ProductCard from "@/ProductCard";
import ProductFilter from "@/ProductFilter";
import useSearchStore from "@/searchStore";

import { useProductsByCategory } from "@/useProductsByCategory";
import { useRouter } from "next/router";
import { useState } from "react";

const CategoryName = () => {
    const [brand, setBrand] = useState("");

    const [price, setPrice] = useState({ minPrice: "", maxPrice: "" });
    const [weight, setWeight] = useState({ minWeight: "", maxWeight: "" });

    const { searchValue } = useSearchStore();

    const router = useRouter();
    const { isReady } = router;
    const categoryName = router.query.categoryName;

    const { data, isLoading, isError } = useProductsByCategory(isReady ? categoryName : "");
    const products = data ? data.products : [];

    const finalProducts = () => {
        const filteredProducts = products.filter((item) => {
            const brandMatch = brand ? item.brand === brand : true;
            const priceMatch =
                (price.minPrice ? item.price >= price.minPrice : true) &&
                (price.maxPrice ? item.price <= price.maxPrice : true);
            const weightMatch =
                (weight.minWeight ? item.weight >= weight.minWeight : true) &&
                (weight.maxWeight ? item.weight <= weight.maxWeight : true);

            return brandMatch && priceMatch && weightMatch;
        });
        const filteredProducts2 = searchValue
            ? filteredProducts.filter((item) => {
                  return item.title.toLowerCase().includes(searchValue.toLowerCase());
              })
            : filteredProducts;
        return filteredProducts2;
    };

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

    if (isLoading) {
        return <Loader label={`Loading Products By Category ${categoryName}`} size="md" />;
    }
    return (
        <div className="flex flex-col gap-4 md:grid md:grid-cols-12">
            <div className="md:col-span-3 bg-base-100 md:h-screen">
                <ProductFilter
                    products={products}
                    brand={brand}
                    setBrand={setBrand}
                    price={price}
                    setPrice={setPrice}
                    weight={weight}
                    setWeight={setWeight}
                />
            </div>
            <div className="col-span-12 md:col-span-9">
                <div className="flex flex-wrap items-center gap-4 justify-center">
                    {finalProducts().length === 0 && (
                        <span className="text-xl font-semibold">No Products Found</span>
                    )}
                    {finalProducts().map((item) => (
                        <div key={item.id}>
                            <ProductCard {...item} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default CategoryName;
