import ActionBtn from "@/ActionBtn";
import Button from "@/Button";
import { cartStore } from "@/cartStore";
import Loader from "@/Loader";
import { useRouter } from "next/router";
import { useState } from "react";

const CartComponent = () => {
    const [replaceMsg, setReplaceMsg] = useState(false);
    const router = useRouter();
    const { totalItems, totalPrice, selectedItems, clearCart } = cartStore();
    const roundPrice = Math.round(totalPrice * 100) / 100;

    const clearCartHandler = () => {
        clearCart();
        setReplaceMsg(true);
        setTimeout(() => {
            router.replace("/products");
        }, 1000);
    };
    if (replaceMsg) {
        return (
            <div className="px-6">
                <Loader label="you will be transferred to the product page in a few moments" />
            </div>
        );
    }
    return (
        <div className="md:grid grid-cols-12 flex flex-col gap-4 p-4">
            <div className="space-y-8 md:space-y-4 col-span-8 ">
                {selectedItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between bg-slate-100 shadow-md rounded-md p-2 ">
                        <div className="flex flex-col gap-4 items-start">
                            <span className="font-semibold">{item.title}</span>
                            <span className="font-semibold">Brand :{item.brand}</span>
                            <span className="font-semibold">Price :${item.price}</span>
                            <ActionBtn product={item} id={item.id} />
                        </div>
                        <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-36 h-36 rounded-md"
                        />
                    </div>
                ))}
            </div>
            <div className="col-span-4 bg-slate-300 shadow-md rounded-md  p-2 flex flex-col gap-4  h-32 sticky top-10 bottom-0">
                <span className="font-semibold ">
                    totaL Price :
                    <span className="bg-orange-400 text-white px-6 rounded-md ml-1">
                        $ {roundPrice}
                    </span>
                </span>
                <span className="font-semibold">
                    totaL Product :
                    <span className="bg-orange-400 text-white px-6 rounded-md ml-1">
                        {totalItems}
                    </span>
                </span>
                <Button
                    label="Checkout"
                    className="btn-primary btn-sm"
                    disabled={selectedItems.length === 0}
                    onClick={clearCartHandler}
                />
            </div>
        </div>
    );
};

export default CartComponent;
