import Button from "@/Button";
import { ChevronDown, ChevronUp, Weight, X } from "lucide-react";
import { useState, useEffect } from "react";

const ProductFilter = ({ products, brand, setBrand, price, setPrice, weight, setWeight }) => {
    const [isOpenPrice, setIsOpenPrice] = useState(false);

    const [isOpenWeight, setIsOpenWeight] = useState(false);

    const toggleSelection = (value, setter, state) => {
        setter(value);
    };

    const priceHandler = (e) => {
        const { name, value } = e.target;
        setPrice({ ...price, [name]: value });
    };
    const weightHandler = (e) => {
        const { value, name } = e.target;

        setWeight({ ...weight, [name]: value });
    };

    const clearAllFilters = () => {
        setBrand("");
        setPrice({ minPrice: "", maxPrice: "" });
        setWeight({ minWeight: "", maxWeight: "" });
    };

    // Removed duplicate brands from the 'products' array
    const brandArray = products.map((item) => item.brand);
    const uniqueBrand = [...new Set(brandArray)];

    return (
        <div className="p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="font-bold text-xl">Filter</h1>
                <Button
                    endIcon={<X size={16} />}
                    label="clear All Filter"
                    size="tiny"
                    onClick={clearAllFilters}
                />
            </div>
            <div className="flex flex-col gap-3 mt-4">
                {price.minPrice && price.maxPrice && (
                    <div className="bg-gray-400 text-white font-semibold p-2 rounded-md flex items-center justify-between">
                        <span>Price :</span>
                        <span>{(+price.minPrice).toLocaleString()}</span>
                        <span>{(+price.maxPrice).toLocaleString()}</span>
                        <Button
                            label={<X size={16} />}
                            size="tiny"
                            onClick={() => setPrice({ minPrice: "", maxPrice: "" })}
                        />
                    </div>
                )}
                {weight.minWeight && weight.maxWeight && (
                    <div className="bg-gray-400 text-white font-semibold p-2 rounded-md flex items-center justify-between">
                        <span>Weight</span>
                        <span>{weight.minWeight}</span>
                        <span>{weight.maxWeight}</span>
                        <Button
                            label={<X size={16} />}
                            size="tiny"
                            onClick={() => setWeight({ minWeight: "", maxWeight: "" })}
                        />
                    </div>
                )}
                {brand && (
                    <div className="bg-gray-400 text-white font-semibold p-2 rounded-md flex items-center justify-between">
                        <span>Brand : </span>
                        <span>{brand}</span>
                        <Button label={<X size={16} />} size="tiny" onClick={() => setBrand("")} />
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-5">
                <>
                    <div className="font-semibold flex items-center justify-between">
                        <span>Price</span>
                        <label className="swap swap-rotate">
                            <input type="checkbox" onChange={() => setIsOpenPrice(!isOpenPrice)} />
                            <ChevronDown size={18} className="swap-off" />
                            <ChevronUp size={18} className="swap-on" />
                        </label>
                    </div>
                    <div
                        className={`flex flex-col gap-4 mt-4 transition-all duration-200 z-50 ${
                            isOpenPrice ? "opacity-100" : "opacity-0 h-0"
                        }`}>
                        <label className="input input-bordered flex items-center gap-2">
                            <input
                                type="number"
                                className="grow"
                                placeholder="Min Price"
                                name="minPrice"
                                value={price.minPrice < 0 ? 0 : price.minPrice}
                                onChange={priceHandler}
                            />
                            <span className="text-gray-400">$</span>
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <input
                                type="number"
                                className="grow"
                                placeholder="Max Price"
                                name="maxPrice"
                                value={price.maxPrice < 0 ? 0 : price.maxPrice}
                                onChange={priceHandler}
                            />
                            <span className="text-gray-400">$</span>
                        </label>
                    </div>
                </>
                <>
                    <div className="font-semibold flex items-center justify-between">
                        <span>Weight</span>
                        <label className="swap swap-rotate">
                            <input
                                type="checkbox"
                                onChange={() => setIsOpenWeight(!isOpenWeight)}
                            />
                            <ChevronDown size={18} className="swap-off" />
                            <ChevronUp size={18} className="swap-on" />
                        </label>
                    </div>
                    <div
                        className={`flex flex-col gap-4 mt-4 transition-all duration-300 ${
                            isOpenWeight ? "opacity-100" : "opacity-0 h-0"
                        }`}>
                        <label className="input input-bordered flex items-center gap-2">
                            <input
                                type="number"
                                className="grow "
                                placeholder="Min Weight"
                                name="minWeight"
                                value={weight.minWeight < 0 ? 0 : weight.minWeight}
                                onChange={weightHandler}
                            />
                            <Weight size={18} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <input
                                type="number"
                                className="grow "
                                placeholder="Max Weight"
                                name="maxWeight"
                                value={weight.maxWeight < 0 ? 0 : weight.maxWeight}
                                onChange={weightHandler}
                            />
                            <Weight size={18} />
                        </label>
                    </div>
                </>
                <>
                    <div className="dropdown dropdown-bottom dropdown-center">
                        <div
                            tabIndex={0}
                            role="button"
                            className="w-full flex items-center justify-between font-semibold">
                            Brand <ChevronDown size={18} />
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu bg-base-300 md:bg-base-100 rounded-box z-[1] w-full p-2 shadow font-semibold space-y-4 mt-4">
                            {uniqueBrand.map((item, index) => (
                                <li key={index}>
                                    <div className="flex items-center justify-between gap-2">
                                        <span>{item}</span>

                                        <input
                                            name="brand"
                                            checked={brand === item}
                                            onChange={(e) =>
                                                toggleSelection(e.target.value, setBrand, brand)
                                            }
                                            value={item}
                                            type="radio"
                                            className=" checkbox checkbox-primary size-5"
                                        />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            </div>
        </div>
    );
};
export default ProductFilter;
